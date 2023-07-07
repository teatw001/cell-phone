import { UserOutlined } from "@ant-design/icons";
import { MenuProps, message } from "antd";
import { Dropdown } from "antd";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const HeaderClient = () => {
    const user = JSON.parse(localStorage.getItem("user")!)
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate(`/search/keyword/${searchValue}`);
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <NavLink rel="noopener noreferrer" to="/profile">
                    Thông tin cá nhân
                </NavLink>
            ),
            icon: <i className="fa-solid fa-user"></i>,
        },
        {
            key: '2',
            label: (
                <NavLink rel="noopener noreferrer" to="/cart">

                    Đơn hàng
                </NavLink>
            ),
            icon: <i className="fa-solid fa-cart-shopping"></i>,
            disabled: false,
        },
        {
            key: '3',
            label: (
                <NavLink target="_blank" to="/admin">
                    Admin
                </NavLink>
            ),
            icon: <i className="fa-solid fa-user-tie"></i>,
            disabled: user?.role === "Admin" ? false : true,
        },
        {
            key: '4',
            danger: true,
            label: (
                <button onClick={() => {
                    localStorage.clear()
                    message.success("Đăng xuất thành công!");
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)
                }}>
                    Logout
                </button>
            ),
            icon: <i className="fa-solid fa-right-from-bracket"></i>,
        },
    ];

    return (
        <header className="bg-red-500 text-white shadow-lg top-0 left-0 w-full z-50">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 md:px-6 md:py-4">
                <div className="flex items-center mb-4 md:mb-0">
                    <NavLink to="/">
                        <svg width="200" height="80" xmlns="http://www.w3.org/2000/svg" href="http://www.w3.org/1999/xlink" viewBox="0 0 269.231 50"><defs><pattern id="patternLogo" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 530 95"><image width="500" height="100" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhIAAABfCAYAAAC9ZC4kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REQzNUE1OThENjI3MTFFQUJDOTI5NjNDMjAyQkNFMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REQzNUE1OTlENjI3MTFFQUJDOTI5NjNDMjAyQkNFMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERDM1QTU5NkQ2MjcxMUVBQkM5Mjk2M0MyMDJCQ0UyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERDM1QTU5N0Q2MjcxMUVBQkM5Mjk2M0MyMDJCQ0UyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtMJt2kAAAPtSURBVHja7Nzbbts6FEDB0ND//zL7mhg1oqoSuS8zjwdBj8SbV4RYY875BQBwxcsQAABCAgAQEgCAkAAAhAQAgJAAAB5wGIJyznyfdwT4N7vPg/GCOGdid/91HnkiYWPZhHvG17gCJXgiAYDfuv3Sc5knEgCAkAAAhAQAICQAACEBACAkAAAhAQAICQCgBi+kAoCfMr95dvmLtzyRAACEBAAgJAAAIQEACAkAACEBAAgJAEBIAABCAgBo7uk3W+54O9hIeu3Dcty2ZnaN/yx6b7PovM3C69F5l/M+QryB86h8c8muezaPihno/z8Kj+0oNn9P39s0Z/Zb8JDZ/nl7FFqYla57NtpgM/A1jaLjPYrO393zNt2X/SYmfvd6YDH4IDOmVe5vFh73WXh8ZpDxibgenXeEDQkRYXOJnV73JgLNmXmLY+vTHN/awIFB1bmb1iViIkdIeBrhWn1wujdjIZCczU1j4uh2wwGu28F9fQxGwY1v7p7/APVHfM67p/dE6zV2JFuUFaJn+FAz/o0Owifmzrzlm7Pq89Y6JlaGxAg26RGue3w5FLuP/9i4trPO3RPzNjff45Pz5rwTE4/yx5Z54sf4u7+z/+YIMHaj+Nq4e4w7zFkHLX8xfFmgPiyxtjCuxu6262wXE55IAMT5IBQpseb66pOiVjEhJADgXFSICSEBAMuCokVMCAkAuBYUZ6JiVg8MIbGfr38C5I+KKzFR4vw/rAEf8gDOu1uC4rdwGN9+dr79bNo/tPVEAgDuj4px4mfeQyNlzAkJAHg2KD693v1vsZEuKIQEAKyLijMxkSoohAQArA2KM//tPSjCRoWQAICYgfEpKoQEAHApJsIFha9/3jOpAM47Vgvx1VFPJAAgd9BtfUIhJAAgf0x87YoJIQEAdWJCSAAAeWJiVUh4hzsAFIwJTyQEEIDzTkykCIlpc2Fuja25syeo5bVhkUZYqMPman9YmtOc42zunHcEs+uFVDPQpsmyuTq+LMaBZh7pOWdejpXIq/GEW6hYK/XHwtwZh6shJYAXhgQ4gI2J6wQh0XLDOmgAAcgnnkosDAkxQcVD19rIOT7mznknJpKGROYNbHNhPdQYK3NnjMTEYsfDC3Um3VwWjcOVXPvd/DnvVsSEdbYwJLJv7syLZRQaC+sn17XYNzmvxYejmAgdEgBQLSb4xtc/AQAhAQAICQBASAAAQgIAQEgAAEICABASAICQAACa82ZLAPjJa7D/gScSAICQAACEBAAgJAAAIQEAICQAACEBAAgJAKAGL6QCoINpCIQEdXhrHLDyvBERQgIA/PISkb+RAACEBAAgJAAAIQEAdPBHgAEAruC43nH9c2MAAAAASUVORK5CYII="></image></pattern></defs> <rect id="header__logo--bg" width="269.231" height="50" fill="url(#patternLogo)"></rect></svg>
                    </NavLink>
                </div>
                <div className="flex items-center space-x-4 flex-1 mb-4 md:mb-0">
                    <div className="relative flex-1">
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Tìm kiếm sản phẩm" className="rounded-full pl-8 py-2 pr-4 w-full focus:outline-none focus:ring focus:ring-red-300 text-sm md:text-base text-black" />
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-[14px] text-black"></i>
                        </form>
                    </div>

                    <div className="hidden md:block hover:bg-red-700 p-2 rounded-[10px]">
                        <NavLink to="tel:0367370371" className="font-medium text-sm flex items-center">
                            <i className="fa-solid fa-phone text-white text-xl mr-2"></i>
                            <div className="flex flex-col">
                                <span className="font-medium">Gọi mua hàng</span>
                                <span className="text-ms">1800.2097</span>
                            </div>
                        </NavLink>
                    </div>

                    <div className="hidden md:block hover:bg-red-700 p-2 rounded-[10px]">
                        <NavLink target="_blank" to="https://google.com/maps/search/cellphones/" className="font-medium text-sm flex items-center">
                            <i className="fas fa-map-marker-alt text-white text-xl mr-2"></i>
                            <div className="flex flex-col">
                                <span className="font-medium">Cửa hàng</span>
                                <span className="text-ms">gần bạn</span>
                            </div>
                        </NavLink>
                    </div>

                    <div className="hidden md:block hover:bg-red-700 p-2 rounded-[10px]">
                        <NavLink to="#" className="font-medium text-sm ">
                            <div className="flex flex-col">
                                <span className="font-medium">Tra cứu</span>
                                <span className="text-ms">đơn hàng</span>
                            </div>
                        </NavLink>
                    </div>

                    <div className="hover:bg-red-700 p-2 rounded-[10px]">
                        <NavLink to="/cart" className="font-medium text-sm rounded-lg flex items-center">
                            <i className="fa-solid fa-shopping-cart text-white text-xl mr-2"></i>
                            <div className="flex flex-col">
                                <span className="font-medium">Giỏ</span>
                                <span className="text-ms">hàng</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
                {user ? (
                    <div className="flex items-center space-x-2 ml-3 md:ml-6">
                        <Dropdown menu={{ items }}>
                            <button onClick={(e) => e.preventDefault()}>
                                <div className="font-medium text-sm flex items-center hover:bg-red-700 rounded-[10px] p-2">
                                    <div className="w-8 h-8 flex justify-center rounded-full ring-2 ring-gray-300 dark:ring-gray-500">
                                        <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/150" alt="" />
                                    </div>
                                    <span className="hidden md:block ml-2">{user.name}</span>
                                </div>
                            </button>
                        </Dropdown>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 ml-3">
                        <NavLink to="/login" className="bg-red-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-red-700 flex items-center space-x-2 text-sm md:text-sm"><i className="fa-solid fa-user"></i>
                            <span>Đăng nhập</span>
                        </NavLink>
                        <NavLink to="/register" className="bg-red-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-red-700 flex items-center space-x-2 text-sm md:text-sm">
                            <i className="fa-solid fa-user-plus"></i>
                            <span>Đăng ký</span>
                        </NavLink>
                    </div>
                )}
            </div>
        </header >
    )
}