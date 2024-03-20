# Contributing to tw2css

Thank you for considering contributing to [Project Name]! We appreciate your interest in improving this project and making it better for everyone.

This document describes how to prepare a PR for a change in the main repository.

- [Prerequisites](#prerequisites)
- [Making changes in the project](#making-changes-in-the-project)

## Prerequisites

- Node 18+
- NPM

If you haven't already, you can fork the main repository and clone your fork so that you can work locally:

```
git clone https://github.com/kerimovok/tw2css.git
```

> [!IMPORTANT]
> It is recommended to create a new branch from master for each of your bugfixes and features.
> This is required if you are planning to submit multiple PRs in order to keep the changes separate for review until they eventually get merged.

## Making changes in the project

To run the project:

1. Navigate to the project directory
2. Run `npm install` to install the node dependencies
3. Run `npm run start` to start the express server 

You could open the postman and test the running server at `http://localhost:3000/api/convert`.
