import React, {PropTypes} from 'react'

import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} =FixedDataTable;


const TextCell = ({rowIndex, data, col, ...props}) => {
    return (
        <Cell {...props}>
            {data[rowIndex][col]}
        </Cell>
    )
};

class BaseFixedTable extends React.Component {

    //TODO: handle null when implmenting redux
    constructor(props) {
        super(props);

        this.state={
            width: document.documentElement.clientWidth-300,
        }
    }

    componentWillMount() {
        window.addEventListener("resize", ()=>{
            this.setState({
                width: document.documentElement.clientWidth-300
            })
        });

        this.props.getDataFromRequest(this.props.req)

    }


    render () {
        let { columns, data, loading, error} = this.props;

        if(loading) {
            return <div className="container"><h1>Loading...</h1></div>
        } else if(error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        } else if(!data || data.length<=0){
            return <div className="container"><h1>Empty data</h1></div>
        }else{
            return (
                <Table
                    rowHeight={50}
                    headerHeight={50}
                    rowsCount={data.length}
                    width={this.state.width}
                    maxHeight={30000}>
                    {
                        columns.map((kvp)=>{
                            return (
                                <Column
                                    header={<Cell>{kvp.label}</Cell>}
                                    cell={<TextCell data={data} col={kvp.value} />}
                                    width={kvp.width || 150}
                                />
                            )
                        })
                    }
                </Table>

            );
        }


    }
}

export default BaseFixedTable