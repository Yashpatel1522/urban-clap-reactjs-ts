import React, { useState } from "react";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/common/FormController/TextField";
import Swal from "sweetalert2";
import { updateUser } from "../../reducer/profile";
import { useNavigate } from "react-router-dom";
import userT from "../../types/userT";
import { validationschemaUpdateProfile } from "../../Schema/updateprofile";
import { errorT } from "../../types/errorT";
import useAxois from "../../hooks/axois";
import "./profile.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

const Profiles = () => {
  const userReduxData = useSelector(
    (state: { user: { user: userT } }) => state.user.user
  );
  const inputRef = React.useRef<HTMLDivElement | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosPut } = useAxois();
  const submitData = async (values: userT, actions: FormikHelpers<userT>) => {
    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("pk", values.pk as unknown as string);
      formData.append("last_name", values.last_name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("contact", values.contact);
      formData.append("address", values.address);
      if (values.profile.profile_photo) {
        formData.append("profile.profile_photo", values.profile.profile_photo);
      }
      const response = await axiosPut(
        `updateuser/`,
        formData as unknown as Record<string, unknown>,
        true
      );

      dispatch(updateUser(response?.context?.profile[0]?.profile_photo));
      if (response.status == "success") {
        Swal.fire({
          title: "success",
          text: "profile updated..",
          icon: "success",
        }).then(() => {
          navigate("/profile");
        });
      }
    } catch (err: unknown) {
      if ((err as errorT).response.data.context) {
        actions.setErrors(
          (err as errorT).response.data.context as FormikErrors<userT>
        );
      }
    }
  };
  const pickImageHandler = () => {
    inputRef.current?.click();
  };

  return (
    <section>
      <Formik
        enableReinitialize
        initialValues={userReduxData}
        validationSchema={validationschemaUpdateProfile}
        onSubmit={submitData}
      >
        {(formik) => (
          <MDBContainer className="py-5">
            <MDBRow className="">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard
                  className="mb-3"
                  style={{
                    borderRadius: ".5rem",
                    width: "134dvh",
                    height: "80dvh",
                  }}
                >
                  <MDBRow className="g-0">
                    <MDBCol
                      md="4"
                      className="gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                        height: "80dvh",
                      }}
                    >
                      <MDBCardImage
                        src={
                          imageUrl == ""
                            ? formik.values?.profile.profile_photo
                            : imageUrl
                        }
                        alt="Avatar"
                        className="my-5"
                        style={{
                          width: "300px",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                          borderBottomLeftRadius: "20px",
                          borderBottomRightRadius: "20px",
                          height: "25dvh",
                        }}
                        fluid
                      />

                      <MDBTypography tag="h1">
                        {formik.values?.first_name} {formik.values?.last_name}
                      </MDBTypography>
                      <MDBCardText>Web Designer</MDBCardText>
                      <input
                        style={{
                          width: "20%",
                          marginLeft: "28%",
                          display: "none",
                        }}
                        type="file"
                        ref={(instance) => {
                          inputRef.current = instance;
                        }}
                        id="profile_photo"
                        name="profile_photo"
                        onChange={(e: unknown) => {
                          formik.setFieldValue(
                            "profile.profile_photo",
                            (
                              (e as React.ChangeEvent<HTMLInputElement>)
                                .currentTarget.files as FileList
                            )[0]
                          );
                          setImageUrl(
                            URL.createObjectURL(
                              (
                                (e as React.ChangeEvent<HTMLInputElement>)
                                  .currentTarget.files as FileList
                              )[0]
                            )
                          );
                        }}
                      />
                      <div>
                        <i
                          onClick={() => {
                            pickImageHandler();
                          }}
                          className="bi bi-pencil-square fs-3"
                          style={{ cursor: "pointer" }}
                          onChange={(e: unknown) => {
                            formik.setFieldValue(
                              "profile.profile_photo",
                              (
                                (e as React.ChangeEvent<HTMLInputElement>)
                                  .currentTarget.files as FileList
                              )[0]
                            );
                            setImageUrl(
                              URL.createObjectURL(
                                (
                                  (e as React.ChangeEvent<HTMLInputElement>)
                                    .currentTarget.files as FileList
                                )[0]
                              )
                            );
                          }}
                        ></i>
                      </div>
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <Form className="form p-3">
                            <div className="row ">
                              <div className="col-md-5"></div>
                              <MDBRow className="pt-1">
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Email</MDBTypography>
                                  <MDBCardText className="text-muted">
                                    <TextField
                                      type="email"
                                      name="email"
                                      placeholder="loremipsum@gmail.com"
                                    />
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Phone</MDBTypography>
                                  <MDBCardText className="text-muted">
                                    <TextField
                                      type="text"
                                      name="contact"
                                      placeholder="loremipsum@gmail.com"
                                    />
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">
                                    First Name
                                  </MDBTypography>
                                  <MDBCardText className="text-muted">
                                    <TextField
                                      type="text"
                                      name="first_name"
                                      placeholder="Lorem"
                                    />
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">
                                    Last Name
                                  </MDBTypography>
                                  <MDBCardText className="text-muted">
                                    <TextField
                                      type="text"
                                      name="last_name"
                                      placeholder="Ipsum"
                                    />
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">
                                    Username
                                  </MDBTypography>
                                  <MDBCardText className="text-muted">
                                    <TextField
                                      type="text"
                                      name="username"
                                      placeholder="yashvahhani"
                                    />
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">
                                    Address
                                  </MDBTypography>
                                  <MDBCardText className="text-muted">
                                    <TextField
                                      type="text"
                                      name="address"
                                      placeholder="Bhavanagar...."
                                    />
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol size="12" className="mb-3">
                                  <button
                                    type="submit"
                                    className="button"
                                    style={{ backgroundColor: "#516395" }}
                                  >
                                    Update
                                  </button>
                                </MDBCol>
                              </MDBRow>
                            </div>
                          </Form>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </Formik>
    </section>
  );
};
export default Profiles;
