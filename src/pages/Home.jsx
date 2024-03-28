import React, {useState} from 'react';
import PortalLayout from "../layouts/PortalLayout";
import {FaArrowDown, FaArrowUp, FaRegBell} from "react-icons/fa";
import {
    Area,
    AreaChart,
    Bar,
    BarChart, Cell, Legend, Pie, PieChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {IoMdCart} from "react-icons/io";
import {MdAutoGraph} from "react-icons/md";
import {TiCreditCard} from "react-icons/ti";
import {SlOptionsVertical} from "react-icons/sl";

const data = [
    {name: "Page A", uv: 4000},
    {name: "Page B", uv: 3000},
    {name: "Page C", uv: 2000},
    {name: "Page D", uv: 2780},
    {name: "Page E", uv: 1890},
    {name: "Page F", uv: 2390},
    {name: "Page G", uv: 3490},
];

const data2 = [
    {name: "Page A", uv: 4000},
    {name: "Page B", uv: 3000},
    {name: "Page C", uv: 2000},
    {name: "Page D", uv: 2780},
    {name: "Page E", uv: 1890},
    {name: "Page F", uv: 2390},
    {name: "Page G", uv: 3490},
];

const data4 = [
    {
        name: "Jan",
        Sales: 40,
        Views: 24,
    },
    {
        name: "Feb",
        Sales: 30,
        Views: 13,
    },
    {
        name: "Mar",
        Sales: 20,
        Views: 98,
    },
    {
        name: "Apr",
        Sales: 27,
        Views: 39,
    },
    {
        name: "May",
        Sales: 18,
        Views: 48,
    },
    {
        name: "June",
        Sales: 23,
        Views: 38,
    },
    {
        name: "July",
        Sales: 34,
        Views: 43,
    },
];

const data1 = [{name: "Page A", uv: 10}];

const pieData = [
    {name: "B", value: 500},
    {name: "A", value: 100},
];
const pieData2 = [
    {name: "B", value: 100},
    {name: "A", value: 250},
];

const COLORS = ["#0D6EFD", "#EFF1F3"];
const COLORS2 = ["#EFF1F3", "#6F42C1"];

const contractor = [
    {
        name: "905 Yards",
        description: "Landscape Contractors",
        worker: "Oshawa",
        url: "./assets/pic1.png",
    },
    {
        name: "Alpine Roofing",
        description: "roofing",
        worker: "Toronto",
        url: "./assets/pic2.png",
    },
    {
        name: "Home Improvemen",
        description: "bathroom renovation",
        worker: "Toronto",
        url: "./assets/pic3.png",
    },
    {
        name: "BYLDAN",
        description: "Architects",
        worker: "Oshawa",
        url: "./assets/pic1.png",
    },
    {
        name: "WHELAN",
        description: "roofing",
        worker: "Oshawa",
        url: "./assets/pic3.png",
    },
    {
        name: "Star flooring",
        description: "roofing",
        worker: "Toronto",
        url: "./assets/pic2.png",
    },
];

const leads = [
    {name: "David Johnson", date: "15/03/2024", url: "./assets/person1.png"},
    {name: "Emily Parker", date: "14/03/2024", url: "./assets/p2.png"},
    {name: "Jennifer Lee", date: "14/03/2024", url: "./assets/p3.png"},
    {name: "Lauren Taylor", date: "15/03/2024", url: "./assets/person1.png"},
    {name: "Sarah Thompson", date: "15/03/2024", url: "./assets/p3.png"},
    {name: "Christopher Davis", date: "14/03/2024", url: "./assets/p2.png"},
];

const orders = [
    {amount: "$339.99", date: "15/03/2024", url: "./assets/pic2.png"},
    {amount: "$400.99", date: "14/03/2024", url: "./assets/pic3.png"},
    {amount: "$800.99", date: "14/03/2024", url: "./assets/pic4.png"},
    {amount: "$800.99", date: "15/03/2024", url: "./assets/pic2.png"},
    {amount: "$499.99", date: "15/03/2024", url: "./assets/pic4.png"},
    {amount: "$299.99", date: "14/03/2024", url: "./assets/pic3.png"},
];

const services = [
    {name: "AGM Renovations", detail: "Basement Renovation", url: "./assets/img1.png", client: '10'},
    {name: "Voxel Builds Inc.", detail: "Basement Renovation", url: "./assets/img2.png", client: '12'},
    {name: "Pristine Contracting", detail: "Basement Renovation", url: "./assets/img3.png", client: '22'},
    {name: "Solid Build Interiors Inc.", detail: "Basement Renovation", url: "./assets/img4.png", client: '30'},

];


const Home = () => {

    const [range, setRange] = useState(5);


    return (
        <>
            <div className="bg-gray-100">
                <div className="flex mt-4 m-auto gap-5">
                    <div className="w-[40%] rounded-md shadow-md p-4 bg-white">
                        <div className="flex align-center items-center gap-6">
                            <h1 className="text-[2rem] text-gray-600 font-[500]">$9,564</h1>
                            <button
                                className="bg-[#FC185A1A] flex gap-2 items-center text-[#FC185A] px-2 rounded-lg py-[2px] text-[14px]">
                                <FaArrowDown size={15} color="#FC185A"/>
                                8.6%
                            </button>
                        </div>
                        <h1 className="font-[400] text-gray-600">Average Weekly Sales</h1>
                        <div className=" mt-4">
                            <ResponsiveContainer width="100%" height={100}>
                                <AreaChart
                                    width={730}
                                    height={250}
                                    data={data}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#16DBCC" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#16DBCC" stopOpacity={0}/>
                                        </linearGradient>
                                        {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient> */}
                                    </defs>

                                    <Tooltip cursor={false}/>
                                    <Area
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#16DBCC"
                                        fillOpacity={1}
                                        fill="url(#colorUv)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 w-[60%] bg-white rounded-xl shadow-md p-4 ">
                        <div className="flex flex-col border-r-2 items-center justify-center">
                            <IoMdCart
                                size={48}
                                className="bg-[#1B79FD1A] p-2 rounded-full"
                                color="#0D6EFD"
                            />
                            <h1 className="mt-4 text-[24px] font-[600] text-gray-600">
                                85,246
                            </h1>
                            <h1 className="mt-4 text-[18px] font-[400] text-gray-600">
                                Orders
                            </h1>
                        </div>
                        <div className="flex flex-col border-r-2 items-center justify-center">
                            <MdAutoGraph
                                size={48}
                                className="bg-[#28F4B71A] p-2 rounded-full"
                                color="#28F4B7"
                            />
                            <h1 className="mt-4 text-[24px] font-[600] text-gray-600">
                                $96,147
                            </h1>
                            <h1 className="mt-4 text-[18px] font-[400] text-gray-600">
                                INCOME
                            </h1>
                        </div>
                        <div className="flex flex-col border-r-2 items-center justify-center">
                            <FaRegBell
                                size={48}
                                className="bg-[#FFE7EE] p-2 rounded-full"
                                color="#FC185A"
                            />
                            <h1 className="mt-4 text-[24px] font-[600] text-gray-600">846</h1>
                            <h1 className="mt-4 text-[18px] font-[400] text-gray-600">
                                Notifications
                            </h1>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <TiCreditCard
                                size={50}
                                className="bg-[#6F42C11A] p-2 rounded-full"
                                color="#6F42C1"
                            />
                            <h1 className="mt-4 text-[24px] font-[600] text-gray-600">
                                $84,472
                            </h1>
                            <h1 className="mt-4 text-[18px] font-[400] text-gray-600">
                                Payments
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="w-[40%]">
                        <div className="grid grid-cols-2 gap-4 justify-between">
                            <div className=" border-2 rounded-md shadow-md p-4 bg-white">
                                <h1 className="text-[2rem] text-gray-600 font-[500]">$9,568</h1>

                                <h1 className="font-[400] text-gray-600">Average Weekly Sales</h1>
                                <div className=" mt-4">
                                    <ResponsiveContainer width="100%" height={150}>
                                        <BarChart width={500} height={300} data={data} barSize={15}>
                                            <Bar dataKey="uv" fill="#FC3D3A" radius={20}/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <h1 className="text-[#14F3B0]">
                                        12.5 %
                                        <span className="text-gray-600 capitalize text-[16px] p-2">
                    From Last Month
                  </span>
                                    </h1>
                                </div>
                            </div>
                            <div className=" border-2 rounded-md shadow-md p-4 bg-white">
                                <h1 className="text-[2rem] text-gray-600 font-[500]">42.5 k</h1>

                                <h1 className="font-[400] text-gray-600">Active Users</h1>
                                <div className=" mt-4">
                                    <ResponsiveContainer width="100%" height={150}>
                                        <RadialBarChart
                                            height={250}
                                            innerRadius="120%"
                                            outerRadius="100%"
                                            data={data1}
                                            startAngle={-40}
                                            endAngle={220}
                                        >
                                            <defs>
                                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0D6EFD" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#16DBCC" stopOpacity={0.3}/>
                                                </linearGradient>
                                            </defs>

                                            <RadialBar
                                                minAngle={100}
                                                clockWise={true}
                                                dataKey="uv"
                                                fill="url(#gradient)"
                                            />
                                        </RadialBarChart>

                                        <h1 className=" mt-[-6rem] ml-[38%] text-[1.3rem] font-[600] text-gray-400">
                                            78%
                                        </h1>
                                    </ResponsiveContainer>

                                    <h1 className="text-gray-600">
                                        24 k users increased from month
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl mt-4 shadow-md p-4 bg-white pb-5">
                            <div className="flex align-center items-center gap-6">
                                <h1 className="text-[2rem] text-gray-600 font-[500]">$9,568</h1>
                                <button
                                    className="bg-[#E5F9F1] flex gap-2 items-center text-[#14F3B0] px-2 rounded-xl  py-[2px] text-[14px]">
                                    <FaArrowUp size={15} color="#14F3B0"/>
                                    8.6%
                                </button>
                            </div>
                            <h1 className="font-[400] text-gray-600">Sales This Year</h1>
                            <div className="flex justify-between mt-2">
                                <h1 className="text-gray-600 text-[15px] font-[400]">
                                    285 left to goal
                                </h1>
                                <h1 className="text-gray-700 font-[600]">{range}%</h1>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={range}
                                onChange={(e) => setRange(e.target.value)}
                                className="w-full bg-gray-100 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md w-[60%]">
                        <div className="flex justify-between">
                            <h1 className="font-[600] text-[19px] text-gray-700">
                                Sales & Views
                            </h1>
                            <SlOptionsVertical/>
                        </div>

                        <ResponsiveContainer width="100%" height={260} className="mt-8">
                            <BarChart height={250} data={data4} barSize={17}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="Views" fill="#0D6EFD" radius={20}/>
                                <Bar dataKey="Sales" fill="#16DBCC" radius={20}/>
                            </BarChart>
                        </ResponsiveContainer>
                        <div
                            className="grid grid-cols-2 justify-between border-[1px] rounded-xl border-gray-400 m-2 p-4">
                            <div className="flex border-r-[1px] border-gray-400 gap-4 align-center items-center">
                                <div className="">
                                    <ResponsiveContainer width={120} height={100}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={50}
                                                innerRadius={40}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-[400] text-gray-600">
                                        Monthly
                                    </h1>
                                    <h1 className="text-[22px] font-[600] text-gray-700">65,127</h1>
                                    <h1 className="text-[#14F3B0] text-[14px] font-[500]">
                                        16.5 %
                                        <span className="text-gray-600 pl-[2px]">55.21 USD </span>
                                    </h1>
                                </div>
                            </div>
                            <div className="flex ml-auto gap-4 align-center items-center">
                                <div className="">
                                    <ResponsiveContainer width={120} height={100}>
                                        <PieChart>
                                            <Pie
                                                data={pieData2}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={50}
                                                innerRadius={40}
                                            >
                                                {pieData2.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS2[index % COLORS2.length]}
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-[400] text-gray-600">Yearly</h1>
                                    <h1 className="text-[22px] font-[600] text-gray-700">
                                        984,246
                                    </h1>
                                    <h1 className="text-[#14F3B0] text-[14px] font-[500]">
                                        24.9%
                                        <span className="text-gray-600 pl-[2px]"> 267.35 USD </span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <div className="flex justify-between items-center pr-2 mb-4">
                            <h1 className="font-[600] text-[20px] text-gray-700">
                                Recent Contractors
                            </h1>
                            <SlOptionsVertical/>
                        </div>
                        {contractor?.map((value, index) => (
                            <div
                                key={index}
                                className="flex justify-center gap-[10px] items-center mt-2 p-2"
                            >
                                <img src={value?.url} alt="" className="h-14 w-14  rounded-xl"/>
                                <div className="flex flex-col ">
                                    <h1 className="font-[500] text-gray-500 text-[16px]">
                                        {value?.name}
                                    </h1>
                                    <h1 className="font-[400] text-gray-500 text-[13px]">
                                        {value?.description}
                                    </h1>
                                </div>
                                <h1 className="font-[500] text-gray-500 text-[14px] ml-auto">
                                    {value?.worker}
                                </h1>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <div className="flex justify-between items-center pr-2 mb-4">
                            <h1 className="font-[600] text-[20px] text-gray-700">
                                Recent Leads
                            </h1>
                            <SlOptionsVertical/>
                        </div>
                        {leads?.map((value, index) => (
                            <div
                                key={index}
                                className="flex justify-center gap-[10px] items-center mt-2 p-2"
                            >
                                <img src={value?.url} alt="" className="h-14 w-14  rounded-xl"/>
                                <h1 className="font-[500] text-gray-500 text-[16px]">
                                    {value?.name}
                                </h1>
                                <h1 className="font-[500] text-gray-500 text-[14px] ml-auto">
                                    {value?.date}
                                </h1>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <div className="flex justify-between items-center pr-2 mb-4">
                            <h1 className="font-[600] text-[20px] text-gray-700">
                                Recent Orders
                            </h1>
                            <SlOptionsVertical/>
                        </div>
                        {orders?.map((value, index) => (
                            <div
                                key={index}
                                className="flex justify-center gap-[10px] items-center mt-2 p-2"
                            >
                                <img src={value?.url} alt="" className="h-14 w-14  rounded-xl"/>
                                <div className="flex flex-col ">
                                    <h1 className="font-[500] text-gray-500 text-[16px]">
                                        Transfer Amount
                                    </h1>
                                    <h1 className="font-[400] text-gray-500 text-[13px]">
                                        {value?.date}
                                    </h1>
                                </div>
                                <h1 className="font-[500] text-gray-500 text-[14px] ml-auto">
                                    {value?.amount}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-xl p-4 mt-6">
                    <h1 className="font-[600] text-[20px] text-gray-700">Popular Services</h1>
                    {services?.map((value, index) => (
                        <div
                            key={index}
                            className="flex justify-center gap-[10px] items-center mt-2 p-2"
                        >
                            <img src={value?.url} alt="" className="h-20 w-26 rounded-xl"/>
                            <div className="flex flex-col ">
                                <h1 className="font-[500] text-gray-500 text-[16px]">
                                    {value?.name}
                                </h1>
                                <h1 className="font-[400] text-gray-500 text-[13px]">
                                    {value?.detail}
                                </h1>
                            </div>
                            <h1 className="font-[500] text-gray-500 text-[16px] ml-auto">
                                {value?.client} clients
                            </h1>
                        </div>
                    ))}


                </div>
            </div>
        </>
    );
};

export default Home;
