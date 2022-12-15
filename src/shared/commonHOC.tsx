import React from "react";

export abstract class CommonHOC<Props, State> extends React.Component<{}, State>{
  constructor(parameters:Props) {
    super({});
  }

  abstract fethInitialData: ()=> Promise<Props>;

  protected initialData: Props | undefined = undefined;

  componentDidMount(): void {
    this.fethInitialData().then((initialData)=> this.initialData = initialData);
  }
}

export abstract class  CommonHOCWrapper<Props> extends React.Component<any, Props | {}>{
  abstract fethInitialProps: ()=> Promise<Props>;
  public abstract RenderComponent: typeof React.Component<Props, any>;

  constructor() {
    super({});
    this.state = {};
  }

  componentDidMount(): void {
    this.fethInitialProps()
    .then((initialData)=> {
      this.setState(initialData)
    });
  }
  
  render() {
    const Component = this.RenderComponent as any;
    const haveRecievedInitialData = !!Object.keys(this.state).length;

    console.log(this.state);

    return haveRecievedInitialData ? (
      <Component {...this.state} />
    ) : (<></>)
  }
}