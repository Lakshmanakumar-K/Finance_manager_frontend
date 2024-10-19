//import { transactionAPI } from "../../apis"
import PropTypes from "prop-types"

export const Transactiontable = ({ transactionDetails, updateTransaction, deleteTransaction }) => {

    return (
        <tbody>
            <tr>
                <td style={{ border: "1px solid green", textAlign: "center" }}>{transactionDetails.type}</td>
                <td style={{ border: "1px solid green", textAlign: "center" }}>
                    {transactionDetails.category == "others" ? `${transactionDetails.category} - ${transactionDetails.others}` : `${transactionDetails.category}`}
                </td>
                <td style={{ border: "1px solid green", textAlign: "center" }}>{transactionDetails.amount}</td>
                <td style={{ border: "1px solid green", textAlign: "center" }}>{transactionDetails.date}</td>
                <td style={{ border: "1px solid green", textAlign: "center" }}>
                    <i onClick={() => { updateTransaction(transactionDetails); }} className="fa fa-pencil" style={{ margin: "5%", cursor: "pointer" }} aria-hidden="true"></i>
                    <i onClick={() => { deleteTransaction(transactionDetails); }} className="fa fa-trash" style={{ margin: "5%", cursor: "pointer" }} aria-hidden="true"></i>
                </td>
            </tr>
        </tbody>
    )
}

Transactiontable.propTypes = {
    transactionDetails: PropTypes.object,
    updateTransaction: PropTypes.func,
    deleteTransaction: PropTypes.func,
}