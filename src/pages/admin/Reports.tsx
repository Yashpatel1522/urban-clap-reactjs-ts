import React, { useState } from "react";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
// import TextField from "../../components/common/FormController/TextField";
import { ReportSchema } from "../../Schema/Reports";
import { errorT } from "../../types/errorT";
import useAxois from "../../hooks/axois";
import TextField from "../../components/common/FormController/TextField";

const Reports = () => {
  const [previewData, setPreviewData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { axoisGet } = useAxois();

  const handleDowonLoadCSV = async (format: string) => {
    try {
      const response = await axoisGet(
        `${format}/`,
        {
          start_date: startDate,
          end_date: endDate,
        },
        "arraybuffer"
      );
      let blob: Blob;
      if (format == "pdf") {
        blob = new Blob([new Uint8Array(response)], {
          type: "application/pdf",
        });
      } else if (format == "csv") {
        blob = new Blob([response], { type: "text/csv" });
      } else {
        throw new Error(`Unsupported file format: ${format}`);
      }
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report_${startDate}_to_${endDate}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (
    values: { start_date: string; end_date: string },
    actions: FormikHelpers<{ start_date: string; end_date: string }>
  ) => {
    setEndDate(values.end_date);
    setStartDate(values.start_date);
    try {
      const response = await axoisGet(`csvdataview/`, {
        start_date: values.start_date,
        end_date: values.end_date,
      });
      setPreviewData(response.context);
    } catch (err: unknown) {
      actions.setErrors(
        ((err as errorT).response.data.context as { data: unknown })
          .data as FormikErrors<{ start_date: string; end_date: string }>
      );
      actions.setSubmitting(false);
    }
  };
  return (
    <div>
      <div className="text-center fs-3 mt-2" style={{ fontWeight: "bold" }}>
        Download Reports
      </div>
      <Formik
        initialValues={intialvalues}
        validationSchema={ReportSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="d-flex gap-5 mt-4">
              <TextField
                type="date"
                name="start_date"
                label="Start Date (YYYY-MM-DD) :"
                className="col-md-5 form-control"
              />
              <TextField
                type="date"
                name="end_date"
                label="End Date (YYYY-MM-DD)"
                className="col-md-5 form-control"
              />
            </div>

            <button type="submit" className="button" disabled={isSubmitting}>
              Preview
            </button>
          </Form>
        )}
      </Formik>

      {previewData.length != 0 ? (
        <React.Fragment>
          <div className="row border mt-2">
            <div className="col-md-2 table-header">Service</div>
            <div className="col-md-2 table-header">Service Provider</div>
            <div className="col-md-2 table-header">User</div>
            <div className="col-md-2 table-header">Area</div>
            <div className="col-md-2 table-header">Slot</div>
            <div className="col-md-2 table-header">Date</div>
            {previewData.map(
              (
                data: {
                  service_name: string;
                  provider_name: string;
                  user_name: string;
                  work_date: string;
                  area_s: string;
                  slot_s: string;
                },
                index
              ) => (
                <div className="row" key={index}>
                  <div className="col-md-2 text-center mt-1">
                    {data.service_name}
                  </div>
                  <div className="col-md-2 text-center mt-1">
                    {data.provider_name}
                  </div>
                  <div className="col-md-2 text-center mt-1">
                    {data.user_name}
                  </div>
                  <div className="col-md-2 text-center mt-1">{data.area_s}</div>
                  <div className="col-md-2 text-center mt-1">{data.slot_s}</div>
                  <div className="col-md-2 text-center mt-1">
                    {data.work_date}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="d-flex">
            <div
              className="bi bi-filetype-csv fs-4 button mt-2 mb-3"
              style={{ width: "250px" }}
              onClick={() => handleDowonLoadCSV("csv")}
            >
              {" "}
              Download CSV
            </div>
            <div
              className="bi bi-filetype-pdf fs-4 button mt-2 mb-3 "
              onClick={() => handleDowonLoadCSV("pdf")}
            >
              {" "}
              Download PDF
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="text-danger text-center fs-3">Data not found!</div>
      )}
    </div>
  );
};

export default Reports;

const intialvalues = {
  start_date: "",
  end_date: "",
};
