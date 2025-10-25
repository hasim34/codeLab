const Judge0Service = require("../utils/judge0");
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const getProblemData = async (problemId, subjectId) => {
  try {
    const filePath = path.join(
      __dirname,
      "../json/testcases",
      `subject${subjectId}`,
      `problem${problemId}.json`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Problem data not found for problem ${problemId} in subject ${subjectId}`
      );
    }

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error reading problem data: ", err);
    throw new Error("Failed to load problem data");
  }
};

const executeCode = async (req, res) => {
  try {
    const { sourceCode, languageId, problemId, subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ error: "Subject ID is required" });
    }

    const problemData = await getProblemData(problemId, subjectId);

    if (!problemData.samples || problemData.samples.length === 0) {
      return res
        .status(400)
        .json({ error: "No test cases found for this problem" });
    }

    const testCase = problemData.samples[0];
    const wrappedSource = buildWrapper(languageId, sourceCode, testCase, problemData.signature);

    const result = await Judge0Service.submitCode(
      wrappedSource,
      languageId,
      testCase.input
    );

    const isCorrect =
      result.stdout && result.stdout.trim() === testCase.output.trim();

    const response = {
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      time: result.time || "0.00",
      memory: result.memory || 0,
      status: result.status?.description || "Unknown",
      passed: isCorrect,
    };
    res.json(response);
  } catch (err) {
    console.log("Code execution error: ", err);
    res.status(500).json({ error: err.message });
  }
};

const submitSolution = async (req, res) => {
  try {
    const { sourceCode, languageId, problemId, subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ error: "subjectid is required" });
    }

    const problemData = await getProblemData(problemId, subjectId);

    const allTestCases = [...problemData.samples, ...problemData.hidden];

    if (allTestCases.length === 0) {
      return res
        .status(400)
        .json({ error: "no test cases found for this problem" });
    }

    let passedTests = 0;
    const testResults = [];
    const wrappedSource = buildWrapper(languageId, sourceCode, testCase, problemData.signature);

    for (const testCase of allTestCases) {
      const result = await Judge0Service.submitCode(
        wrappedSource,
        languageId,
        testCase.input
      );
      const isCorrect =
        result.stdout && result.stdout.trim() === testCase.output.trim();

      if (isCorrect) passedTests++;

      testResults.push({
        input: testCase.input,
        expected: testCase.output,
        output: result.stdout || "",
        passed: isCorrect,
        time: result.time || "0.00",
        memory: result.memory || 0,
      });
    }
    const status =
      passedTests === allTestCases.length ? "Accepted" : "Wrong Answer";
    res.json({
      status,
      passedTests,
      totalTests: allTestCases.length,
      testResults: testResults.slice(0, problemData.samples.length),
    });
  } catch (err) {
    console.error("Submission error: ", err);
    res.status(500).json({ error: error.message });
  }
};

// buildWrapper.js
const buildWrapper = (languageId, code, testCase, signature) => {
  const funcName = signature.functionName || "solve";
  const args = signature.parameters.map((p) => p.name).join(", ");

  // helper to parse params depending on type
  const parsePython = (p, i) => {
    if (p.type.startsWith("List"))
      return `${p.name} = ast.literal_eval(data[${i}])`;
    if (p.type === "int") return `${p.name} = int(data[${i}])`;
    if (p.type === "string") return `${p.name} = data[${i}]`;
    return `${p.name} = data[${i}]`;
  };

  const parseJS = (p, i) => {
    if (p.type.startsWith("List"))
      return `const ${p.name} = JSON.parse(input[${i}]);`;
    if (p.type === "int") return `const ${p.name} = parseInt(input[${i}], 10);`;
    if (p.type === "string") return `const ${p.name} = input[${i}];`;
    return `const ${p.name} = input[${i}];`;
  };

  switch (languageId) {
    // ======================
    // Python 3
    // ======================
    case 71: // Python 3
      return `
${code}

if __name__ == "__main__":
    import ast
    data = """${testCase.input}""".strip().splitlines()
    ${signature.parameters.map((p, i) => parsePython(p, i)).join("\n    ")}
    print(${funcName}(${args}))
`;

    // ======================
    // JavaScript (Node.js)
    // ======================
    case 63: // JavaScript (Node.js 12.x)
      return `
${code}

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\\n");
${signature.parameters.map((p, i) => parseJS(p, i)).join("\n")}
const res = ${funcName}(${args});
console.log(res);
`;

    // ======================
    // C (GCC)
    // ======================
    case 50: // C (GCC 9.2.0)
      return `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// user code
${code}

int main() {
    char line[10000];
    // read each parameter line
${signature.parameters
  .map((p, i) => {
    if (p.type.startsWith("List")) {
      return `
    fgets(line, sizeof(line), stdin);
    int ${p.name}[1000], ${p.name}_size = 0;
    char *tok = strtok(line, "[, ]");
    while (tok != NULL) {
        ${p.name}[${p.name}_size++] = atoi(tok);
        tok = strtok(NULL, "[, ]");
    }`;
    }
    if (p.type === "int") {
      return `    int ${p.name}; scanf("%d", &${p.name});`;
    }
    return `    char ${p.name}[1000]; fgets(${p.name}, sizeof(${p.name}), stdin);`;
  })
  .join("\n")}
    // call function
    // NOTE: user must implement function matching signature
    // Example assumes return array of 2 ints
    int res[2];
    ${funcName}(${signature.parameters
        .map((p) => {
          if (p.type.startsWith("List")) return `${p.name}, ${p.name}_size`;
          return p.name;
        })
        .join(", ")}, res);
    printf("[%d,%d]\\n", res[0], res[1]);
    return 0;
}
`;

    // ======================
    // C++ (GCC)
    // ======================
    case 54: // C++ (GCC 9.2.0)
      return `
#include <bits/stdc++.h>
using namespace std;

// user code
${code}

int main() {
    string line;
${signature.parameters
  .map((p, i) => {
    if (p.type.startsWith("List")) {
      return `
    getline(cin, line);
    line.erase(remove(line.begin(), line.end(), '['), line.end());
    line.erase(remove(line.begin(), line.end(), ']'), line.end());
    stringstream ss(line);
    vector<int> ${p.name};
    int val; char ch;
    while (ss >> val) {
        ${p.name}.push_back(val);
        ss >> ch;
    }`;
    }
    if (p.type === "int") {
      return `    int ${p.name}; cin >> ${p.name};`;
    }
    return `    string ${p.name}; getline(cin, ${p.name});`;
  })
  .join("\n")}
    auto res = ${funcName}(${args});
    // assumes vector<int> return
    cout << "[";
    for (size_t i = 0; i < res.size(); i++) {
        cout << res[i];
        if (i + 1 < res.size()) cout << ",";
    }
    cout << "]\\n";
    return 0;
}
`;

    // ======================
    // Java
    // ======================
    case 62: // Java (OpenJDK 13)
      return `
import java.util.*;
public class Main {
    ${code}

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${signature.parameters
  .map((p, i) => {
    if (p.type.startsWith("List")) {
      return `
        String line${i} = sc.nextLine().replaceAll("[\\\\[\\\\]]", "");
        String[] parts${i} = line${i}.split(",");
        int[] ${p.name} = new int[parts${i}.length];
        for (int j = 0; j < parts${i}.length; j++) {
            ${p.name}[j] = Integer.parseInt(parts${i}[j].trim());
        }`;
    }
    if (p.type === "int") {
      return `        int ${p.name} = Integer.parseInt(sc.nextLine().trim());`;
    }
    return `        String ${p.name} = sc.nextLine().trim();`;
  })
  .join("\n")}
        int[] res = ${funcName}(${args});
        System.out.println("[" + res[0] + "," + res[1] + "]");
    }
}
`;

    // ======================
    // Default: no wrapping
    // ======================
    default:
      return code;
  }
};

module.exports = { getProblemData, executeCode, submitSolution, buildWrapper };
