import React, { useMemo } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCheckbox,
    MDBSelect,
    MDBBtn,
    MDBInputGroup,
    MDBInputGroupElement,
    MDBInputGroupText
} from 'mdb-react-ui-kit';

function Vote() {
    const selectData = useMemo(() => [
        { text: 'One', value: 1, defaultSelected: true },
        { text: 'Two', value: 2 },
        { text: 'Three', value: 3 },
        { text: 'Four', value: 4 },
        { text: 'Five', value: 5 },
        { text: 'Six', value: 6 },
        { text: 'Seven', value: 7 },
        { text: 'Eight', value: 8 },
    ], []);

    return (
        <MDBRow tag='form' className='row-cols-lg-auto g-3 align-items-center'>
            <MDBCol size='12'>
                <MDBInputGroup className='mb-3'>
                    <MDBInputGroupText>@</MDBInputGroupText>
                    <MDBInputGroupElement type='text' placeholder='Username' />
                </MDBInputGroup>
            </MDBCol>
            <MDBCol size='12'>
            </MDBCol>
            <MDBCol size='12'>
                <MDBCheckbox label='Remember me' />
            </MDBCol>
            <MDBCol size='12'>
                <MDBBtn type='submit'>Submit</MDBBtn>
            </MDBCol>
        </MDBRow>
    );
}

export { Vote };