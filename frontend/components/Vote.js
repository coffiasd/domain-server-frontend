import React, { useMemo, useEffect } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput,
    MDBTable,
    MDBTableHead,
    MDBTableBody
} from 'mdb-react-ui-kit';

export default function Vote({ VoteToRecover, voteList }) {

    //RecoverProcessId.
    const [RecoverProcessId, setRecoverProcessId] = React.useState("");
    //a new address.
    const [NewAddress, setNewAddress] = React.useState("");
    //the list of processID.
    const [ProcessID, setProcessID] = React.useState([]);

    const onChangeRecoverProcessId = (event) => {
        const RecoverProcessId = event.target.value;
        setRecoverProcessId(RecoverProcessId);
    }

    const onChangeNewAddress = (event) => {
        const address = event.target.value;
        setNewAddress(address);
    }

    useEffect(() => {
        voteList().then(function (data) {
            setProcessID(data);
        })
    }, [])

    return (
        <MDBRow tag='form' className='row-cols-lg-auto g-3 align-items-center'>
            <MDBCol size='12'>
                <MDBInput label='RecoverProcessId' id='form1' type='text' value={RecoverProcessId} onChange={onChangeRecoverProcessId} />
            </MDBCol>
            <MDBCol size='12'>
                <MDBInput label='New Address' id='form2' type='text' value={NewAddress} onChange={onChangeNewAddress} />
            </MDBCol>
            <MDBCol size='12'>
                <MDBBtn type='button' onClick={event => VoteToRecover(event, RecoverProcessId, NewAddress)}>Vote</MDBBtn>
            </MDBCol>

            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>RecoverProcessId</th>
                        <th scope='col'>newHash</th>
                        <th scope='col'>newOwner</th>
                        <th scope='col'>Option</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {ProcessID ? ProcessID.map((item, index) => {
                        return <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{item.slice(0, 10)}******</td>
                            <td>
                                <MDBCol size='12'>
                                    <MDBInput label='give me a new hash' id='form2' type='text' />
                                </MDBCol>
                            </td>
                            <td>
                                <MDBCol size='12'>
                                    <MDBInput label='give me a new owner address' id='form2' type='text' />
                                </MDBCol>
                            </td>
                            <td><button type="button" className="btn btn-danger">Recover</button></td>
                        </tr>
                    }) : null}

                </MDBTableBody>
            </MDBTable>

        </MDBRow>

    );
}