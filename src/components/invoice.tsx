import React from "react";
import { IHaveToken } from "../shared/typings";

interface IInvoiceManageProps extends IHaveToken {

}

interface IInvoiceManageState {
	families: any[];
	payments: any[];
	last: string;
}

export class InvoiceManage extends React.Component<IInvoiceManageProps, IInvoiceManageState> {
    constructor(props: IInvoiceManageProps) {
        super(props);
        this.state = {
					families:[],
					payments:[],
					last:"old"
      	};
    }

	componentDidMount(){
		this.do_update(0)
	}

	// update data from google sheets 
	do_update(update = 1){
		var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.props.token);
		formData.append("update", `${update}`);
		fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
			this.setState({families:resp.families,
				 		   last:resp.last})
			}
		);
	}

	// filter lessons from csv
	do_filter(){
		var formData = new FormData(document.getElementById("filter_items") as HTMLFormElement);
        formData.append("csrfmiddlewaretoken", this.props.token);
		formData.append("filter", 1);
		fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
			this.setState({payments:resp.payments})
			}
		);
	}

	do_make_pdf(){
		var formData = new FormData(document.getElementById("make_pdf") as HTMLFormElement);
        formData.append("csrfmiddlewaretoken", this.props.token);
		formData.append("make_pdf", '1');
		formData.append("payments", JSON.stringify(this.state.payments.slice()));
		fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
			window.location.href = resp.url;
			}
		);
	}

    select_lesson(index: number){
        var payments = this.state.payments.slice();
        payments[index].cancel = 1 - payments[index].cancel;
        this.setState({payments:payments});
    }


    render() {
        return (
            <div className="container">
				<h2>Making an invoice</h2>
				<h4>Step 0 (can be skipped): get actual data from google sheets</h4>
				<div className="row my-2">
				<div className="col-6">
					<span>Last date: </span>
					<strong>{this.state.last}</strong>
					</div>

					<div className="col-6">
					<button type="button" className="btn btn-info" onClick={()=>this.do_update()}>Update data from sheets</button>
					</div>
				</div>

				<h4>Step 1: choose family</h4>
				<form id="filter_items">
				<div className="row">
					<div className="col-sm-6">
					<select name="family" className="form-control">
						<option value="Not chosen">Not chosen</option>
						{this.state.families.map((item, index)=>
							<option value={item}>{item}</option>
						)}
					</select>
					</div>
					<div className="col-sm-6">
					<button type="button" className="btn btn-success" onClick={()=>this.do_filter()}>Get table</button>
					</div>
				</div>
				</form>
				
				<h4>Step 2: confirm information</h4>
				<form id="make_pdf">
					<div className="row">
						<div className="col-sm-6 my-1">
							<input type="text" name="recipient" className="form-control"
							 defaultValue="Alexandrov Yury Valentinovitch 11, boulevard Albert 1er, 98000 Monaco"/>
						</div>
						<div className="col-sm-4 my-1">
						<input type="text" name="dates" className="form-control"
							 defaultValue="George (11.06 - 12.09)"/>
						</div>
						<div className="col-sm-4 my-1">
							<input type="number" name="invoice" className="form-control"
							 defaultValue="90"/>
						</div>
						<div className="col-sm-4 my-1">
							<button type="button" className="btn btn-success" onClick={()=>this.do_make_pdf()}>Make pdf</button>
						</div>
					</div>
					
					<table className="table table-stripped">
						<thead>
							<tr>
								<th>Choose?</th>
								<th>Date</th>
								<th>Subject</th>
								<th>Student</th>
								<th>Hours</th>
								<th>Fee</th>
								<th>Fee(Numeric)</th>
							</tr>
						</thead>
						<tbody>
							{this.state.payments.map((item, index)=>
								<tr className="click-invoice" onClick={()=>this.select_lesson(index)}>
								<td>{item.cancel ?<span>X</span> : <span>&#10003;</span>}</td>
								<td>{item.dt}</td>
								<td>{item.class}</td>
								<td>{item.student}</td>
								<td>{item.hours}</td>
								<td>{item.fee}</td>
								<td>{item.fee_num}</td>
								</tr>
							)}
						</tbody>
					</table>
				</form>
      </div>
    )
  }
}