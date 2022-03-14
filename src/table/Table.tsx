import IColumnData, { IColumn } from "./IColumnData"

interface IProps {
    columns: IColumn[],
    data: IColumnData[]
}

const Table: React.FC<IProps> = ({ columns, data }) => {
    return (
        <>
            <h1>{"Flights"}</h1>
            <table>
                <thead>
                    <tr>
                        {columns.map((row) => {
                            return <th key={row.key}>{row.header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((unit) => {
                        return (
                            <tr key={unit.flight}>
                                <td>{unit.origin}</td>
                                <td>{unit.flight}</td>
                                <td>{unit.arrival}</td>
                                <td>{unit.state}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Table