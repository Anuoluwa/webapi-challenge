const validateAction = (req, res, next) => {
    const { id } = req.body;
    const { description, notes, completed } = req.body;
    const action = {
      id,
      notes,
      description,
      completed
    };
    if (typeof action.notes === "undefined" || typeof action.description === "undefined" || typeof action.completed === "undefined") {
      return res
        .status(404)
        .json({
          errorMessage: "Please provide name, description and completed as keys, with values for the new action."
        });
    }
    if (action.name.trim() === "" || action.description.trim() === "" || action.completed.trim() === "") {
      return res
        .status(404)
        .json({ errorMessage: "Please provide value for the new action." });
    }
    next();
  };
  
  export default validateAction;