import { forwardRef } from "react";

const Input = (
  { label, id, type = "text", error, required, ...inputProps },
  ref
) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>

      <input
        ref={ref}
        id={id}
        type={type}
        className={`form-control ${error ? "input-error" : ""}`}
        {...inputProps}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};
export default forwardRef(Input);
