import { Formik } from "formik";
import React, { useEffect } from "react";

export default ({ children, values: externalValues, onChange, ...props }) => {
  let syncFormik = () => {};
  useEffect(() => {
    if (externalValues != null) {
      Object.entries(externalValues).forEach(([key, value]) => {
        syncFormik({
          target: {
            value,
            name: key,
            attributes: {
              name: key
            }
          }
        });
      });
    }
  }, [externalValues]);
  return (
    <Formik {...props}>
      {({ handleChange, values, ...other }) => {
        syncFormik = handleChange;
        return children({
          ...other,
          values: externalValues != null ? externalValues : values,
          handleChange: evt => {
            if (onChange) {
              onChange({
                [evt.target.name]: evt.target.value
              });
            } else {
              handleChange(evt);
            }
          }
        });
      }}
    </Formik>
  );
};
