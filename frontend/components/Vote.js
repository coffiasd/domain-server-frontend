import React, { useMemo } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInputGroup,
    MDBInputGroupElement,
    MDBInputGroupText,
    MDBCheckbox,
    MDBInput
} from 'mdb-react-ui-kit';

export default function Vote() {
    return (
        <MDBRow tag='form' className='row-cols-lg-auto g-3 align-items-center'>
            <MDBCol size='12'>
                <MDBInput label='Input Vote Address' id='form1' type='text' />
            </MDBCol>
            {/* <MDBCol size='12'>
                <MDBCheckbox label='Remember me' />
            </MDBCol> */}
            <MDBCol size='12'>
                <MDBBtn type='button'>Vote</MDBBtn>
            </MDBCol>
        </MDBRow>
    );
}