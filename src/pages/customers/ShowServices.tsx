import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import "./showservices.css";
import { Avatar, IconButton, Menu, MenuItem, Rating, Tooltip } from "@mui/material";
import SerachBox from "../../components/common/FormController/SerachBox";
import useAxois from "../../hooks/axois";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateNotification } from "../../reducer/profile";
import userT from "../../types/userT";

const ShowServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { axoisGet } = useAxois();
  const user = useDispatch();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );
  const settings: settingsT[] = [
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ];
  interface settingsT {
    name: string;
    path: string;
  }
  async function fetchMyAPI() {
    try {
      const response = await axoisGet(`updateuser/`);
      const userdata = response.context;
      user(
        addUser({
          ...userdata,
          profile: { profile_photo: userdata.profile[0].profile_photo },
          notification: [],
        })
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  React.useEffect(() => {
    fetchMyAPI();
  }, []);

  const handleOpenUserMenu = (event: React.ChangeEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const storedata = useSelector(
    (state: { user: { user: userT } }) => state.user
  );
  React.useEffect(() => {
    if (storedata?.user?.pk != undefined) {
      const socket = new WebSocket(
        `ws://127.0.0.1:8000/ws/notifications/${storedata?.user?.pk}/`
      );

      socket.onopen = () => {
        console.log("WebSocket connection established.");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(updateNotification(data.message));
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => socket.close();
    }
  }, [storedata?.user?.pk]);
  const debouncedSearch = useCallback(
    debounce(async (page, query) => {
      try {
        setLoader(false);
        const response = await axoisGet("service-filter/", {
          page,
          search: query,
        });
        const newrow = response.context?.results.map(convertRow);
        setAllServices(newrow);
        setTotalPage(Math.ceil(response.context.count / 2));
        setLoader(true);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoader(true);
      }
    }, 500),
    []
  );

  const convertRow = (data: {
    id: number;
    average_rating: number;
    user: { username: string; id: number };
    description: string;
    price: number;
    category: { name: string };
    area: [{ id: number; name: string }];
    slot: [{ id: number; slot: string }];
  }) => ({
    id: data.id,
    rating: data.average_rating,
    servicedescription: data.description,
    price: data.price,
    serviceprovider: data.user.username,
    sp_id: data.user.id,
    servicecategory: data.category.name,
    areas: data.area.map((area) => ({
      id: area.id,
      name: area.name,
    })),
    slots: data.slot.map((slot) => ({ id: slot.id, name: slot.slot })),
  });

  useEffect(() => {
    debouncedSearch(currentPage, inputValue);
  }, [currentPage, inputValue, debouncedSearch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setCurrentPage(1);
    debouncedSearch(1, value);
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleUpdate = (data: {
    service: number;
    slot: [{ id: number; name: string }];
    area: [{ id: number; name: string }];
    work_date: string;
  }) => {
    navigate("/book-appointment", { state: data });
  };

  const handleShowReview = (data: { id: number }) => {
    navigate("/reviews", { state: data });
  };

  return (
    <div >
      <div style={{ width: "70%", backgroundColor: 'white', position: 'fixed', top: 0, left: 286, zIndex: 10 }}>
        <div className="p-3 row" >
          <div className="col d-flex gap-2">
            <img
              src={"./assets/images/logo1.png"}
              alt="Company Logo"
              className="bg-dark"
              style={{ height: "40px", width: "40px", borderRadius: '10px' }}
            />
            <div className=" fs-6" style={{ fontWeight: "bold" }}>
              Urban<br />Clap
            </div>
          </div>
          <div className="col">
            <div className="gap-5 mt-2" style={{ marginLeft: '5%' }}>
              <div className="ul d-flex gap-3 justify-content-start">
                <Link className="a" to="/all-services">Home</Link>
                <Link className="a" to="/status">Orders</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex justify-content-center">
              <SerachBox
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search services..."
                className="form-control"
                name={"serach"}
              />
            </div>
          </div>
          <div className="col">
            <div className="mt-2 d-flex d-flex justify-content-end gap-2">
              <i className="bi bi-bell-fill fs-5"></i>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={storedata?.user?.profile?.profile_photo}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting: settingsT) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link
                      className="link-offset-2 link-underline link-underline-opacity-0 text-dark"
                      to={setting.path}
                    >
                      {setting.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </div>
        <div className="border-bottom" style={{ position: 'fixed', width: '100%', left: '0' }}></div>
      </div >
      <div style={{ width: "70%", margin: "0% auto" }}>
        {
          loader ? (
            <React.Fragment>
              {allServices.map(
                (item: {
                  id: number;
                  rating: number;
                  servicedescription: string;
                  price: number;
                  serviceprovider: string;
                  sp_id: number;
                  servicecategory: string;
                  areas: [{ id: number; name: string }];
                  slots: [{ id: number; name: string }];
                }) => (
                  <div key={item.id} className="service-card">
                    <div className="header">{item.servicedescription}</div>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Rating:</strong>
                      </div>
                      <div className="col-md-6">
                        <Rating value={item.rating == 0 ? 0 : item.rating} readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Price:</strong>
                      </div>
                      <div className="col-md-6">{item.price}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Service Provider:</strong>
                      </div>
                      <div className="col-md-6">{item.serviceprovider}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Category:</strong>
                      </div>
                      <div className="col-md-6">{item.servicecategory}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Slots:</strong>
                      </div>
                      <div className="col-md-6">
                        {item.slots.map((slot) => (
                          <div key={slot.id}>{slot.name}</div>
                        ))}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Areas:</strong>
                      </div>
                      <div className="col-md-6">
                        {item.areas.map((area) => (
                          <div key={area.id}>{area.name}</div>
                        ))}
                      </div>
                    </div>
                    <div className="button-container">
                      <button
                        className="button"
                        onClick={() =>
                          handleUpdate({
                            service: item.id,
                            slot: item.slots,
                            area: item.areas,
                            work_date: "",
                          })
                        }
                      >
                        Book Appointment
                      </button>
                      <button
                        className="button"
                        onClick={() => handleShowReview({ id: item.id })}
                      >
                        Show Reviews
                      </button>
                    </div>
                  </div>
                )
              )}
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  className="button"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
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
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "15% auto",
              }}
            >
              {" "}
              <Loading />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ShowServices;
