import React, { useState, useRef, useEffect } from "react"
import uuid from "uuid"

import "./dropdown.scss"

const Dropdown = ({ activatorText = 'Dropdown', items = [] }) => {
    const activatorRef = useRef(null);
    const dropdownListRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = (event) => {
        setIsOpen(!isOpen);
    };

    const keyHandler = (event) => {
        if (isOpen && event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const clickOutsideHandler = (event) => {
        if (dropdownListRef.current.contains(event.target) || 
            activatorRef.current.contains(event.target)) {
            return;
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            dropdownListRef.current.querySelector('a').focus();
            document.addEventListener('mousedown', clickOutsideHandler);
        } else {
            document.removeEventListener('mousedown', clickOutsideHandler);
            // activatorRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div
            className="dropdown-wrap"
        >
            <button
                aria-haspopup="true"
                aria-controls="dropdown1"
                onClick={clickHandler}
                ref={activatorRef}
                className="dropdown-activator"
                onKeyUp={keyHandler}
                data-testid="dropdown-activator"
            >
                {activatorText}
            </button>

            <ul
                id="dropdown1"
                ref={dropdownListRef}
                tabIndex="-1"
                className={`dropdown-itemList ${isOpen ? 'active' : ''}`}
                onKeyUp={keyHandler}
                role="list"
                data-testid="dropdown-itemList"
            >
                {items.map((item, index) => {
                    return <li key={index}>
                        <a href={item.url}>{item.text}</a>
                    </li>
                })}
            </ul>
        </div>
    )
}
export default Dropdown
