import db from "../libs/db.js";

export const createProblem = async (req, res) => {
    const {title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions} = req.body;

    if (req.body.role !== "ADMIN") {
        return res.status(403).json({
            message: "You are not allowed to create a problem",
        });
    }

    try {
        for (const[language, solutionCode] of Object.entries(referenceSolutions)) {
            
        }
    }
}

export const getAllProblems = async (req, res) => {}

export const getProblemById = async (req, res) => {}

export const updateProblem = async (req, res) => {} 

export const deleteProblem = async (req, res) => {}

export const getAllProblemsSolvedByUser = async (req, res) => {}

