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

export default function Vote({ VoteToRecover, voteList, recoverOwnership }) {

    //RecoverProcessId.
    const [RecoverProcessId, setRecoverProcessId] = React.useState("");
    //a new address.
    const [NewAddress, setNewAddress] = React.useState("");
    //the list of processID.
    const [ProcessID, setProcessID] = React.useState([]);
    //set newHash value.
    const [NewHash, setNewHash] = React.useState("");
    //old 
    const [OldHash, setOldHash] = React.useState("");

    //on processId value change.
    const onChangeRecoverProcessId = (event) => {
        const RecoverProcessId = event.target.value;
        setRecoverProcessId(RecoverProcessId);
    }

    //on new hash value change.
    const onChangeNewHash = (event) => {
        const NewHash = event.target.value;
        setNewHash(NewHash);
    }

    const onChangeOldHash = (event) => {
        const OldHash = event.target.value;
        setOldHash(OldHash);
    }

    //on new address value change.
    const onChangeNewAddress = (event) => {
        const address = event.target.value;
        setNewAddress(address);
    }

    //RecoverOwner.
    const RecoverOwner = (event, oldHash, newHash, processID) => {
        recoverOwnership(event, processID, oldHash, newHash)
    }

    //use [] to call the function voteList() when the component is mounted.
    useEffect(() => {
        voteList().then(function (data) {
            setProcessID(data);
        })
    }, [])

    //render.
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
                        <th scope='col'>oldSecret</th>
                        <th scope='col'>newSecret</th>
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
                                    <MDBInput label='OldSecret' id='form2' type='text' onChange={onChangeOldHash} value={OldHash} />
                                </MDBCol>
                            </td>
                            <td>
                                <MDBCol size='12'>
                                    <MDBInput label='NewSecret' id='form2' type='text' onChange={onChangeNewHash} value={NewHash} />
                                </MDBCol>
                            </td>
                            <td><button type="button" className="btn btn-danger" onClick={event => RecoverOwner(event, OldHash, NewHash, item)}>Recover</button></td>
                        </tr>
                    }) : null}

                </MDBTableBody>
            </MDBTable>

        </MDBRow>

    );
}