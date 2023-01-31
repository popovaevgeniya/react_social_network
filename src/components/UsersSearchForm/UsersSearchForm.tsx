import {Field, Form, Formik} from 'formik';
import React from 'react';
import {FilterType} from '../../redux/users-reducer';

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChange}) => {
    const usersSearchFormValidate = (values: any) => {
        return {};
    }

    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        onFilterChange(values)
        setTimeout(() => {
            setSubmitting(false)
        }, 400);
    }

    return (
        <Formik
            initialValues={{term: '', friend: null}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    )
})

export default UsersSearchForm