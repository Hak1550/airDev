import { FormTitle } from 'Components/Forms';
import { OutlinedButton } from 'Components/IconButton/styles';
import Mail from 'Components/Icons/Mail';
import { usePaymentInputs } from 'Components/PaymentFormComponent';
import { Card, FormHeader } from '../styles';
import images from 'Components/PaymentFormComponent/images';

const DefaultPaymentMethod = ({ data, SideNavPageType, handleSideNavPage }) => {
  const { getCardImageProps } = usePaymentInputs();
  const cardbrand = {
    displayName: data?.card?.brand,
    type: data?.card?.brand,
  };
  return (
    <>
      <Card>
        <FormTitle description={''}>
          <div className="d-flex justify-content-between ">
            <div className="d-flex">
              <div
                style={{
                  border: '1px solid #F2F4F7',
                  borderRadius: '6px',
                  width: '58px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* <VisaLogo /> */}
                <svg
                  {...getCardImageProps({ images, cardbrand })}
                  height="30px"
                  width={'35px'}
                />
              </div>
              <div
                className="d-flex flex-column  mx-3"
                style={{ width: '80%' }}
              >
                <span style={{ fontSize: '14px', color: '#344054' }}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {data?.card?.brand}
                  </span>{' '}
                  ending in {data?.card?.last4}
                </span>
                <span style={{ fontSize: '14px', color: '#667085' }}>
                  Expiry {data?.card?.exp_month}/{data?.card?.exp_year}
                </span>
                <div>
                  <Mail width={'16'} height={'16'} />
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#667085',
                      marginLeft: '8px',
                    }}
                  >
                    {data?.billing_details?.email}{' '}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <OutlinedButton
                className="btn btn-sm"
                onClick={() => handleSideNavPage('Payment Details', data.id)}
              >
                Edit
              </OutlinedButton>
            </div>
          </div>
        </FormTitle>
      </Card>
    </>
  );
};

export default DefaultPaymentMethod;
