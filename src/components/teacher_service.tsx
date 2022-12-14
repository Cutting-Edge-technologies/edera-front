import React from "react";
import { IHaveToken } from "../shared/typings";
import { IUser } from "./activate";
import { ICurrencyAll_dict, IGroup, IServiceAll_dict } from "./service";
import { ICost, IStudentService } from "./student_service";

export interface ITeacherService extends IStudentService {};
export interface IServiceAll_dictWithOptionalGroup extends IServiceAll_dict {
	group ?:string;
};


export interface ITeacerServiceItemsManageProps extends IHaveToken {
	all_dicts:{
    groups: IGroup[]
    services: IServiceAll_dictWithOptionalGroup[];
    currency: ICurrencyAll_dict[];
  };
	users: IUser[];
	services: IStudentService[];
	costs: ICost[];
}

export interface ITeacerServiceItemsManageState {
	items: IUser[];
	services: ITeacherService[];
	costs: ICost[];
	edit_item: number;
	edit_service: number;
	edit_cost: number;
	view: string;
	n: number;
};

export class ItemsManage extends React.Component <ITeacerServiceItemsManageProps, ITeacerServiceItemsManageState> {
    constructor(props: ITeacerServiceItemsManageProps) {
        super(props);
        this.state = 
		{
			items:this.props.users,
			//all_services:this.props.all_services,
			services: [],
			costs: [],
      edit_item: -1,
			edit_service: -1,
			edit_cost:-1,
			view:"edit",
			n:0
        };
    }

	get_services(user_id: number){
		console.log("user_id", user_id, this.state.edit_item);
		var formData = new FormData();
		formData.append("csrfmiddlewaretoken", this.props.token);
    formData.append("user_id", `${user_id}`);
		formData.append("action", "get_service");
		fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
			this.setState({services:resp.services, edit_item:user_id, edit_service:-1, edit_cost:-1, costs:[]})
		})
	}

	get_costs(service_id: number){
		console.log("get_costs", service_id);
		var formData = new FormData();
		formData.append("csrfmiddlewaretoken", this.props.token);
		formData.append("user_id", `${this.state.edit_item}`);
		formData.append("service_id", `${service_id}`);
		formData.append("action", "get_cost");
		fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
			let costs = resp.costs.slice()
			costs.push({id:0, cost:2000, currency:{id:1, name:'rub'}, date_from:'2022-01-01'})
			this.setState({costs:costs, n:this.state.n+1, edit_service: service_id, edit_cost:-1})
		})
	}

	edit_service(index: number, service_id: number, d: number = 0){
		console.log("edit_service", index, service_id);
    var formData = new FormData(document.getElementById("edit_service") as HTMLFormElement);
		formData.append("csrfmiddlewaretoken", this.props.token);
		formData.append("action", "edit_service");
		formData.append("delete", `${d}`);
		fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
			let services =  this.state.services.slice()
			if(d==0){
				if(service_id == 0){
					services.push(resp.service)
				}
				else{
					services[index] = resp.service
				}
				}
			else{
				services.splice(index, 1)
			}
			this.setState({services:services, edit_service:-1, edit_cost:-1, costs:[]})
		})
	}

  edit_cost(index: number, d: number=0){
		console.log("edit_service", index, this.state.edit_item);
    var formData = new FormData(document.getElementById("edit_cost") as HTMLFormElement);
		formData.append("csrfmiddlewaretoken", this.props.token);
		formData.append("action", "edit_cost");
		formData.append("delete", `${d}`);
		fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
			console.log(resp);
			//let services =  this.state.costs.slice();
			//costs[index] = resp.cost;
			this.setState({edit_service:-1, edit_cost:-1, costs:[]});
		})
	}

	service_select(service_id: number){
		let all_services= this.props.all_dicts.services.slice()
		all_services.push({id:0, name:"Not chosen"})
		console.log(all_services);
		return (
			<select name="service_code_id" className = "form-control-lg my-2" defaultValue={service_id}>
				{all_services.map((item, index) => 
					<option value = {item.id}> {item.name} - {item.group}</option>)}|
			</select>
		)
	}

	currency_select(currency_id: number){
		let all_services= this.props.all_dicts.currency.slice()
		all_services.push({id:0, name:"Not chosen"})
		console.log(all_services);
		return (
			<select name="currency_id" className = "form-control form-control-lg" defaultValue={currency_id}>
				{all_services.map((item, index) => 
					<option value = {item.id}> {item.name} </option>)}|
			</select>
		)
	}

	show_cost(item:ICost, index: number){
		if(this.state.edit_cost==item.id){
			return (
				<form id="edit_cost">
					<div>
						<input type='hidden' name='user_id' value={this.state.edit_item}></input>
						<input type='hidden' name='service_id' value={this.state.edit_service}></input>
						<input type='hidden' name='cost_id' value={this.state.edit_cost}></input>
					</div>
					<div className="row">
						<div className="col-md-12 my-1">
							<label>Cost</label>
							<input name = 'cost' type="number" className="form-control form-control-lg" defaultValue={item.cost}></input>
						</div>
						<div className="col-md-12 my-1">
							<label>Currency</label>
								{this.currency_select(item.currency.id)}
						</div>
						<div className="col-md-12 my-1">
							<label>Date from</label>
							<input name = 'date_from'  className="form-control form-control-lg" defaultValue={item.date_from}></input>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 col-4">
							<button type="button" onClick={()=>this.edit_cost(index,  0)} className="btn btn-success btn-lg">
								Save
							</button>
						</div>
						{item.id>0 ?
							<div className="col-md-4 col-4">
								<button type="button" onClick={()=>this.edit_cost(index, 1)} className="btn btn-danger btn-lg">
									Delete
								</button>
							</div> : ""
						}
						<div className="col-md-4 col-4">
							<button type="button" onClick={()=>this.setState({edit_cost:-1})} className="btn btn-secondary btn-lg">
								Cancel
							</button>
						</div>
					</div>
				</form>
			)
		}
		else{
			return (
				<div className={item.id === this.state.edit_service ? "element-card selected" : "element-card"}
					onClick = {()=>this.setState({edit_cost:item.id, n:this.state.n+1})}>
					{item.id > 0 ? <span>{item.cost} {item.currency.name} from {item.date_from} </span>: "Add new cost"}
				</div>
			)
		}
	}

	what_to_show(item: ITeacherService, index:number){
		console.log(item);
		if(item.id === this.state.edit_service){
			let costs = this.state.costs.slice();
			if(this.state.costs.length>0){
				return (
					<div className="row">
						<div className="col-md-6">
							<div className="element-card"
						 		onClick={() => this.setState({n:this.state.n+1, costs: [], edit_cost:-1, edit_service:-1})}> {item.service.name} - {item.service.group} costs</div>
						</div>
						<div className="col-md-6"> {costs.map((cost, ind)=>this.show_cost(cost, ind))} </div>
					</div>
				)
			}
			else{
				return (
					<form id="edit_service">
						<input type='hidden' name='user_id' value={this.state.edit_item}></input>
						<input type='hidden' name='service_id' value={this.state.edit_service}></input>
						{this.service_select(item.service.id)}
							<div className="row">
								<div className="col-md-4 col-4">
									<button type="button" onClick={()=>this.edit_service(index, item.id, 0)} className="btn btn-success btn-lg">
										Save
									</button>
								</div>
									{item.id>0 ?
									<div className="col-md-4 col-4">
										<button type="button" onClick={()=>this.edit_service(index, item.id, 1)} className="btn btn-danger btn-lg">
											Delete
										</button>
									</div> : ""}
									<div className="col-md-4 col-4">
										<button type="button" onClick={()=>this.setState({edit_service:-1})} className="btn btn-secondary btn-lg">
											Cancel
										</button>
									</div>
							</div>
					</form>
				)
			}
		}
		else{
			return (
				<div className="row">
					<div className="col-md-6">
						<div className="element-card" onClick={() => this.setState({n:this.state.n+1, edit_service: item.id, costs:[], edit_cost:-1})}> {item.service.name} - {item.service.group}</div>
					</div>
					{item.id>0 ?
						<div className="col-md-6">
							<div className="element-card" onClick={() => this.get_costs(item.id)}>Show costs</div>
						</div> : ""
					}
				</div>
			)
		}
	}

	view_teacher_services(){
		let services = this.state.services.slice()
		services.push({id:0, service:{id:0, name:"Add new service", group:""}, costs:[]})
		if(this.state.view=="edit"){
			return (
				<div>
					<h2 className="my-2">Services for user_id = {this.state.edit_item}</h2>
					{services.map((item, index) =>
						<div> {this.what_to_show(item, index)} </div>
					)}
				</div>
			)
		}
		else{
			return (
				<div>
					<h2 className="my-2">Services for user_id = {this.state.edit_item}</h2>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Service</th>
								<th>Group</th>
								<th>Cost</th>
							</tr>
						</thead>
						<tbody>
							{this.state.services.map((item, i1)=>
								<tr>
									<td> {item.service.name}</td>
									<td> {item.service.group}</td>
									<td>
										{item.costs.length>0 ? item.costs.map((cost, i2)=>
										<p>{cost.cost} {cost.currency.name} from {cost.date_from}</p>
										): ""
										}	
									</td>
								</tr>
							)}			
						</tbody>
					</table>
				</div>
			)
		}
	}

  render() {
    return (
      <div className="container">
				<div className="row">
					<div className="col-md-4">
						<select className="form-control-lg" onChange = {(e)=>this.get_services(parseInt(e.target.value))}>
							<option value="0"> Not chosen</option>
							{this.state.items.map((item, index) =>
								<option value={item.user_id}>{item.name}</option>
							)}
						</select>
					</div>
					<div className="col-md-4">
						<select className="form-control-lg" value={this.state.view} onChange={(e)=>{
							this.get_services(this.state.edit_item);
							this.setState({view:e.target.value})
						}}>
							<option value="edit">Editor</option>
							<option value="table">Table view</option>
						</select>
					</div>
				</div>
				{this.state.edit_item>0 ? this.view_teacher_services() :
					<h2 className="my-2">Choose a teacher</h2>
				}
      </div>
    )
  }
}
