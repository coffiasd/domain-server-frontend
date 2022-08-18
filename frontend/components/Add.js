import React from 'react';

export default function AddVote({ newGuardian }) {
    const [guardian, setguardian] = React.useState("");

    const onChangeEvent = (event) => {
        const address = event.target.value;
        setguardian(address)
    }

    return (
        <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col col-lg-9 col-xl-7">
                    <div className="card rounded-3">
                        <div className="card-body p-4">

                            <h4 className="text-center my-3 pb-3">G list</h4>

                            <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                <div className="col-12">
                                    <div className="form-outline">
                                        <input type="text" id="form1" className="form-control" onChange={onChangeEvent} value={guardian} />
                                        <label className="form-label" htmlFor="form1">Address</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button type="button" onClick={event => newGuardian(event, guardian)} className="btn btn-primary">Add</button>
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

                                    <tr>
                                        <th scope="row">1</th>
                                        <td>ox****ad23</td>
                                        <td>
                                            <button type="button" className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row">1</th>
                                        <td>ox****ad23</td>
                                        <td>
                                            <button type="button" className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}