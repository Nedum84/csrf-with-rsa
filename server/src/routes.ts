import express from "express";
import { csrfValidation } from "./middlewares/csrf.request";
import { SuccessResponse } from "./utils/success.response";

const router = express.Router({ mergeParams: true });

// Validate csrf request
router.use(csrfValidation);

// Auth Routes
router.use("/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", age: 29, isActive: true },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", age: 34, isActive: false },
    { id: 3, name: "Emily Davis", email: "emily.davis@example.com", age: 23, isActive: true },
    { id: 4, name: "Michael Brown", email: "michael.brown@example.com", age: 41, isActive: false },
    { id: 5, name: "Chris Wilson", email: "chris.wilson@example.com", age: 36, isActive: true },
  ];

  return SuccessResponse.ok(res, users);
});

export const routes = router;
