import React from "react";

const HorizontalMenu = () => {
  return (
    <>
      <div class="horizontal-menu">
        <nav class="bottom-navbar">
          <div class="container">
            <ul class="nav page-navigation">
              <li class="nav-item">
                <a class="nav-link" href="index.html">
                  <i class="mdi mdi-compass-outline menu-icon"></i>
                  <i
                    class="fa-solid fa-house"
                    style={{ color: "#fff", marginRight: "5px" }}
                  ></i>
                  <span class="menu-title">Home</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-monitor-dashboard menu-icon"></i>
                  <i
                    class="fa-solid fa-user"
                    style={{ color: "#fff", marginRight: "5px" }}
                  ></i>
                  <span class="menu-title">Admin</span>
                  <i
                    class="fa-solid fa-chevron-down"
                    style={{ color: "#fff" }}
                  ></i>
                </a>
                <div class="submenu">
                  <ul class="submenu-item">
                    <li class="nav-item">
                      <a class="nav-link" href="pages/ui-features/buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/dropdowns.html"
                      >
                        Dropdown
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/typography.html"
                      >
                        Typography
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-monitor-dashboard menu-icon"></i>
                  <i
                    class="fa-solid fa-users"
                    style={{ color: "#fff", marginRight: "5px" }}
                  ></i>
                  <span class="menu-title">Client</span>
                  <i
                    class="fa-solid fa-chevron-down"
                    style={{ color: "#fff" }}
                  ></i>
                </a>
                <div class="submenu">
                  <ul class="submenu-item">
                    <li class="nav-item">
                      <a class="nav-link" href="pages/ui-features/buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/dropdowns.html"
                      >
                        Dropdown
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/typography.html"
                      >
                        Typography
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-monitor-dashboard menu-icon"></i>
                  <i
                    class="fa-solid fa-users-line"
                    style={{ color: "#fff", marginRight: "5px" }}
                  ></i>
                  <span class="menu-title">Candidates</span>
                  <i
                    class="fa-solid fa-chevron-down"
                    style={{ color: "#fff" }}
                  ></i>
                </a>
                <div class="submenu">
                  <ul class="submenu-item">
                    <li class="nav-item">
                      <a class="nav-link" href="pages/ui-features/buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/dropdowns.html"
                      >
                        Dropdown
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/typography.html"
                      >
                        Typography
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-monitor-dashboard menu-icon"></i>
                  <i
                    class="fa-solid fa-house"
                    style={{ color: "#fff", marginRight: "5px" }}
                  ></i>
                  <span class="menu-title">Housing</span>
                  <i
                    class="fa-solid fa-chevron-down"
                    style={{ color: "#fff" }}
                  ></i>
                </a>
                <div class="submenu">
                  <ul class="submenu-item">
                    <li class="nav-item">
                      <a class="nav-link" href="pages/ui-features/buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/dropdowns.html"
                      >
                        Dropdown
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/typography.html"
                      >
                        Typography
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-monitor-dashboard menu-icon"></i>
                  <i
                    class="fa-sharp fa-solid fa-file-chart-pie"
                    style={{ color: "#fff", marginRight: "5px" }}
                  ></i>
                  <span class="menu-title">Reports</span>
                  <i
                    class="fa-solid fa-chevron-down"
                    style={{ color: "#fff" }}
                  ></i>
                </a>
                <div class="submenu">
                  <ul class="submenu-item">
                    <li class="nav-item">
                      <a class="nav-link" href="pages/ui-features/buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/dropdowns.html"
                      >
                        Dropdown
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="pages/ui-features/typography.html"
                      >
                        Typography
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <div class="nav-link d-flex">
                  <button class="btn btn-sm bg-danger text-white">
                    Trailing
                  </button>
                  <div class="nav-item dropdown">
                    <a
                      class="nav-link count-indicator dropdown-toggle text-white font-weight-semibold"
                      id="notificationDropdown"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      English
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                      aria-labelledby="notificationDropdown"
                    >
                      <a class="dropdown-item" href="#">
                        <i class="flag-icon flag-icon-bl me-3"></i> French
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">
                        <i class="flag-icon flag-icon-cn me-3"></i> Chinese
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">
                        <i class="flag-icon flag-icon-de me-3"></i> German
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">
                        <i class="flag-icon flag-icon-ru me-3"></i>Russian
                      </a>
                    </div>
                  </div>
                  <a class="text-white" href="index.html">
                    <i class="mdi mdi-home-circle"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HorizontalMenu;
