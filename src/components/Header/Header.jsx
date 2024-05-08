import {MdLocationOn} from "react-icons/md"
import {HiCalendar, HiMinus, HiPlus, HiSearch} from "react-icons/hi";
import {useRef, useState} from "react";
import useOutsideClick from "../../hooks/useOutsideClick.js";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from "react-date-range";
import {format} from "date-fns";

function Header() {
    const [destination, setDestination] = useState("")
    const [openOption, setOpenOption] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const [date , setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ])

    const [openDate , setopenDate] = useState(false)

    const handleOptions = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    return (
        <>
            <div className="header">
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <MdLocationOn className="headerIcon locationIcon"/>
                        <input
                            type="text"
                            placeholder="where to go?"
                            className="headerSearchInput"
                            name="destination"
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}/>
                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <HiCalendar className="headerIcon dateIcon"/>
                        <div onClick={()=> setopenDate(!openDate)} className="dateDropDown">
                            {`${format(date[0].startDate,"MM/dd/yyyy")} to  ${format(date[0].endDate,"MM/dd/yyyy")}`}
                        </div>
                        {
                            openDate && <DateRange onChange={(item) => setDate([item.selection])} minDate={new Date()} moveRangeOnFirstSelection={true} ranges={date} className="date"/>
                        }
                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <div id="optionDropDown"
                             onClick={() => setOpenOption(!openOption)}>{options.adult} Adult &bull; {options.children}
                            Children &bull; {options.room} Room
                        </div>
                        {openOption && <GuestOptionList setOpenOptions={setOpenOption} handleOptions={handleOptions}
                                                        options={options}/>}
                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerSearchBtn">
                            <HiSearch className="headerIcon"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header

function GuestOptionList({options, handleOptions, setOpenOptions}) {
    const optionRef = useRef()
    useOutsideClick(optionRef,"optionDropDown", () => setOpenOptions(false));
    return (
        <div className="guestOptions" ref={optionRef}>
            <OptionItem handleOptions={handleOptions} type="adult" minlimit={1} Options={options}/>
            <OptionItem handleOptions={handleOptions} type="children" minlimit={0} Options={options}/>
            <OptionItem handleOptions={handleOptions} type="room" minlimit={1} Options={options}/>
        </div>
    )
}

function OptionItem({Options, type, minlimit, handleOptions}) {
    return (
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="optionCounter">
                <button
                    onClick={() => handleOptions(type, ("dec"))}
                    className="optionCounterBtn" disabled={Options[type] <= minlimit}>
                    <HiMinus className="icon"/>
                </button>
                <span className="optionCounterNumber">{Options[type]}</span>
                <button
                    onClick={() => handleOptions(type, ("inc"))}
                    className="optionCounterBtn">
                    <HiPlus className="icon"/>
                </button>
            </div>
        </div>
    )
}