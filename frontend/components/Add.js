import React, { useEffect } from 'react';
import {
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit';

export default function AddVote({ newGuardian, guardianList, removeGuardian, setSecretFunc }) {
    const [guardian, setguardian] = React.useState("");
    const [secret, setsecret] = React.useState("");
    const [list, setlist] = React.useState([]);

    const onChangeEvent = (event) => {
        const address = event.target.value;
        setguardian(address);
    }

    //onChangeSecret
    const onChangeSecret = (event) => {
        const secret = event.target.value;
        setsecret(secret);
    }

    //set A NEW Secret.
    const setSecretButton = (event) => {
        setSecretFunc(event, secret).then(function (data) {
            console.log(data);
            alert("Secret seted");
        });
    }

    //once render.
    useEffect(() => {
        guardianList().then(function (data) {
            setlist(data);
            console.log("useEffect list:", list);
        })
    }, [])

    return (
        <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col col-lg-9 col-xl-7">
                    <div className="card rounded-3">
                        <div className="card-body p-4">

                            <h4 className="text-center my-3 pb-3">guardian list</h4>

                            <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                <div className="col-12">
                                    <MDBCol size='12'>
                                        <MDBInput label='new guardian address' id='form2' type='text' onChange={onChangeEvent} value={guardian} />
                                    </MDBCol>
                                </div>
                                <div className="col-12">
                                    <button type="button" onClick={event => newGuardian(event, guardian)} className="btn btn-primary">Add</button>
                                </div>

                                <div className="col-12">
                                    <MDBCol size='12'>
                                        <MDBInput label='newSecret' type='text' onChange={onChangeSecret} value={secret} />
                                    </MDBCol>
                                </div>
                                <div className="col-12">
                                    <button type="button" onClick={event => setSecretButton(event)} className="btn btn-primary">set</button>
                                </div>

                            </form>

                            <table className="table mb-3">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((item, index) => {
                                        return <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item}</td>
                                            <td>
                                                <button type="button" onClick={event => removeGuardian(event, item)} key={index} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    })
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}