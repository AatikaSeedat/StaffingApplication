import React, { Component } from 'react';
import LeaveTable from "./AmendData/ShiftsTable";
import AmendButttons from "./AmendData/AmendButtons";

class AmendData extends Component {
    render() {
        return (
            <div className="AmendData" >
                <LeaveTable/>
                <AmendButttons/>
            </div>
        );
    }
}

export default AmendData;