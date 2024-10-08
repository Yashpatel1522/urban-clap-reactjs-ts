import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import userT from "../../types/userT";
import servicesT from "../../types/showservices";
import SerachBox from "../../components/common/FormController/SerachBox";
import React from "react";
import useAxois from "../../hooks/axois";
import Loading from "../Loading";

const Showservices = () => {
  const [services, setServices] = useState<Array<servicesT>>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [user, setUser] = useState("");
  const userreduxdata = useSelector(
    (state: { user: { user: userT } }) => state.user.user
  );
  const { axiosDelete, axoisGet } = useAxois();

  const navigate = useNavigate();
  const location = useLocation();

  const handleUpdate = (data: servicesT) => {
    navigate("/Addservices", {
      state: data,
    });
  };
  const handleAddServices = () => {
    navigate("/Addservices", {
      state: {
        category: "",
        area: [],
        description: "",
        price: "",
        slot: [],
      },
    });
  };

  const handleDelete = (id: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success btn-gap",
        cancelButton: "btn btn-danger btn-gap",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const servicesResult: Array<servicesT> =
            services.filter((service: servicesT) => {
              return service.id != id;
            }) || [];
          setServices(servicesResult);
          await axiosDelete(`services/${id}/`);
          swalWithBootstrapButtons
            .fire({
              title: "Deleted!",
              text: "Category Deleted...!",
              icon: "success",
            })
            .then(async () => {
              setCurrentPage(1);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your data is safe :)",
            icon: "error",
          });
        }
      });
  };

  const debouncedSearch = useCallback(
    debounce(async (page, query) => {
      setLoader(false);
      const response = await axoisGet(`services/`, {
        page,
        serach: query,
        user:
          user == "" && location.state?.id == undefined
            ? ""
            : user == ""
            ? location.state?.id
            : user,
      });
      setServices(response.context?.results);
      setTotalPage(Math.ceil(response.context.count / 2));
      setLoader(true);
    }, 500),
    []
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setCurrentPage(1);
    debouncedSearch(currentPage, value);
  };

  useEffect(() => {
    if (location.state?.id != "") {
      setUser(location.state?.id);
    }
    debouncedSearch(currentPage, inputValue);
  }, [currentPage, debouncedSearch, user]);

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      {userreduxdata?.pk == 1 && (
        <div
          className="text-center btn btn-danger "
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </div>
      )}
      <div className="text-center fs-3 mt-2" style={{ fontWeight: "bold" }}>
        Servicesff
      </div>
      <div className="mb-4 mt-3">
        <SerachBox
          name="search"
          value={inputValue}
          onChange={handleInputChange}
          className="form-control"
          placeholder="seacrh here"
        />
      </div>
      <div className="add">
        {location.state?.id == undefined ? (
          <p
            className="button"
            style={{ width: "140px" }}
            onClick={() => {
              handleAddServices();
            }}
          >
            Add Services
          </p>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
      {loader ? (
        <React.Fragment>
          {services.length == 0 ? (
            <div className="fs-3 text-danger col-12 text-center mt-5">
              No Data Found
            </div>
          ) : (
            <React.Fragment>
              <table style={{ width: "100%", padding: "5px", height: "50%" }}>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>

                  {services.map((item: servicesT, key) => {
                    return (
                      <tr key={key}>
                        <td>{item.id}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>
                          <p
                            onClick={() =>
                              handleUpdate({
                                id: item.id,
                                category: item.category,
                                area: item.area,
                                description: item.description,
                                price: item.price,
                                slot: item.slot || [],
                              })
                            }
                            className="btn btn-primary"
                          >
                            Update
                          </p>
                        </td>
                        <td>
                          <p
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  className="button"
                  onClick={handlePrev}
                  disabled={currentPage == 1}
                >
                  Prev
                </button>
                <button
                  className="button"
                  onClick={handleNext}
                  disabled={currentPage === totalPage}
                >
                  Next
                </button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Showservices;
