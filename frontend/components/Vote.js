import React, { useMemo, useEffect } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';

export default function Vote({ VoteToRecover, voteList }) {

    //RecoverProcessId.
    const [RecoverProcessId, setRecoverProcessId] = React.useState("");
    //a new address.
    const [NewAddress, setNewAddress] = React.useState("");
    //the list of processID.
    const [list, setlist] = React.useState([]);

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
            console.log("processID:", data);
            setlist(data);
        })
    });

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
        </MDBRow>
    );
}