import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {Breadcrumbs, Snackbar, Text} from 'glide-design-system';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import HomeIcon from '../../assets/icons/home.svg';
import RenderPatientData from '../../components/RenderInformation/RenderPatientData';
import RenderNurseNotes from '../../components/RenderInformation/RenderNurseNotes';
import RenderPhysicianNotes from '../../components/RenderInformation/RenderPhysicianNotes';
import {
  fetchViewCompletedTaskData,
  reviewFormSliceActions,
} from '../ReviewFormSlice';

export default function ViewReviewPatient() {
  const dispatch = useDispatch();
  const {id} = useParams();

  const completedTaskFormData = useSelector(
    state => state.reviewForm.completedTaskData,
  );

  useEffect(() => {
    dispatch(fetchViewCompletedTaskData(id));
  }, []);

  // selectors
  const reviewFormErrorMessage = useSelector(state => state.reviewForm.message);
  const reviewFormNotification = useSelector(
    state => state.reviewForm.notification,
  );
  const reviewFormError = useSelector(state => state.reviewForm.error);
  return (
    <Grid container padding={1} style={{marginTop: '8px'}}>
      {reviewFormNotification && (
        <Snackbar
          id="alert-message"
          style={{zIndex: '1'}}
          open
          message={reviewFormErrorMessage}
          type={reviewFormError ? 'error' : 'success'}
          autoHideDuration={5000}
          onClose={() => dispatch(reviewFormSliceActions.closeNotification())}
        />
      )}
      <Grid item xs={12} marginBottom="8px">
        <Breadcrumbs separator=">">
          <Text href="/" style={{color: ' #aaaaaa'}}>
            <img src={HomeIcon} alt="" style={{marginRight: '3px'}} />
            Home
          </Text>
          <Text href="/" style={{color: ' #aaaaaa'}}>
            Patients for Review
          </Text>
          {/* <Text style={{color: ' #aaaaaa'}}>John Doe</Text> */}
        </Breadcrumbs>
      </Grid>

      <Grid item xs={12} marginBottom="8px">
        <Text type="h1">View Patient Information</Text>
      </Grid>

      <Grid
        item
        xs={12}
        style={{border: '1px solid #d7d7d7', borderRadius: 5, padding: 8}}>
        <RenderPatientData viewData={completedTaskFormData} />
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          border: '1px solid #d7d7d7',
          borderRadius: 5,
          padding: 8,
          marginTop: 8,
        }}>
        <RenderNurseNotes viewData={completedTaskFormData} />
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          border: '1px solid #d7d7d7',
          borderRadius: 5,
          padding: 8,
          marginTop: 8,
        }}>
        <RenderPhysicianNotes viewData={completedTaskFormData} />
      </Grid>
    </Grid>
  );
}
