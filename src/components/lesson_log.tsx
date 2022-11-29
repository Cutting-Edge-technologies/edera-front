import React from "react";
import { IHaveToken } from "../shared/typings";

interface ILessonLogProps extends IHaveToken {
	dt_from: any;
	dt_to: any;
}

interface ILessonLogState {
	action: string;
	order_by: string;
	dt_from: any;
	dt_to: any;
	items: any[];
}

export class LessonLog extends React.Component<ILessonLogProps, ILessonLogState> {
    constructor(props: ILessonLogProps) {
        super(props);
        this.state = {
            action: "create",
            dt_from: this.props.dt_from,
						dt_to: this.props.dt_to,
						order_by:"log_date",
						items:[],
        };
    }

    get_data(){
		console.log(this.state);
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("action", this.state.action);
		formData.append("dt_from", this.state.dt_from);
		formData.append("dt_to", this.state.dt_to);
		formData.append("order_by", this.state.order_by);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                this.setState({items:resp.items})
        });
    }


    render() {
        //this.items.push({id:0, name:'', account_id:'', client_id:'', client_secret:''});
        return (
            <div className="container">
            <div className="row">
				<div className="col-lg-3 col-md-6 mb-3">
					<label  className="form-label">Действие</label>    
					<select name="action" className="form-control form-control-lg"
					 value={this.state.action} onChange={(e)=>this.setState({"action":e.target.value})}>
						<option value="create">Created</option>
						<option value="delete">Deleted</option>
						<option value="all">All</option>
					</select>
				</div>
                                    
				<div className="col-lg-3 col-md-6 mb-3">
					<label  className="form-label">Уроки от</label>
					<input type="text" name="dt_from" className="form-control form-control-lg"
					 value={this.state.dt_from} onChange={(e)=>this.setState({"dt_from":e.target.value})}
					/>
                </div>

				<div className="col-lg-3 col-md-6 mb-3">
					<label  className="form-label">Уроки до</label>
					<input type="text" name="dt_to" className="form-control form-control-lg"
					 value={this.state.dt_to} onChange={(e)=>this.setState({"dt_to":e.target.value})}
					/>
                </div>

				<div className="col-lg-3 col-md-6 mb-3">
					<label  className="form-label">Сортировать по</label>    
					<select name="order_by" className="form-control form-control-lg"
					 value={this.state.order_by} onChange={(e)=>this.setState({"order_by":e.target.value})}>
						<option value="log_date">Дата действия</option>
						<option value="lesson_date">Дата урока</option>	
					</select>
				</div>

                <div className="col-md-3 col-6 mb-3">
					<button type="button" onClick={()=>this.get_data()} className="btn btn-success btn-lg">
						Получить лог</button>
				</div>

			</div>

			<table className="table table-stripped">
				<thead>
					<tr>
						<th>Action</th>
						<th>Who</th>
						<th>Id</th>
						<th>Date</th>
						<th>Pair</th>
						<th>Name</th>
						<th>Log date</th>
					</tr>
				</thead>
				<tbody>
					{this.state.items.map((el, index)=>
					<tr>
						<td>{el.action}</td>
						<td>{el.who}</td>
						<td>{el.lesson_id}</td>
						<td>{el.lesson_date}</td>
						<td>{el.lesson_pair}</td>
						<td>{el.lesson_name}</td>
						<td>{el.log_date}</td>
					</tr>
					)
					}
				</tbody>
			</table>
            </div>

            
        )
    }
}
