import { FormTitle } from '../Forms';
import Mail from '../Icons/Mail';
import VisaLogo from '../Icons/VisaLogo';
import checkboxBase from '../../Assets/images/CheckboxbaseCircle.png';
import tick from '../../Assets/images/tickCircleBlue.png';
import {
  Card,
  CardContentWrapper,
  CardDefault,
  CardDetails,
  CardEdit,
  CardHeader,
  CheckIcon,
} from './styles';

const CustomRadioCard = ({
  options,
  handleSideNavPage,
  selectedCard,
  setSelectedCard,
}) => {
  return (
    <div>
      {options.map(item => (
        <div key={item?.id}>
          <input
            type="radio"
            name="radio-card"
            defaultChecked={item?.id === selectedCard}
            className="d-none"
          />
          <CardContentWrapper onClick={() => setSelectedCard(item.id)}>
            <CheckIcon>
              <img
                src={item?.id === selectedCard ? tick : checkboxBase}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </CheckIcon>
            <Card isDefault={item?.id === selectedCard}>
              <FormTitle description={''}>
                <div className="d-flex">
                  <CardDetails>
                    <VisaLogo />
                  </CardDetails>
                  <div
                    className="d-flex flex-column  mx-3"
                    style={{ width: '80%' }}
                  >
                    <CardHeader isDefault={item?.id === selectedCard}>
                      <span style={{ textTransform: 'capitalize' }}>
                        {item?.card?.brand}
                      </span>{' '}
                      ending in {item?.card?.last4}
                    </CardHeader>
                    <span style={{ fontSize: '14px', color: '#667085' }}>
                      Expiry {item?.card?.exp_month}/{item?.card?.exp_year}
                    </span>

                    <div>
                      <CardDefault isDefault={item?.id === selectedCard}>
                        Set as default
                      </CardDefault>
                      <CardEdit
                        onClick={() =>
                          handleSideNavPage('Payment Details', item.id)
                        }
                      >
                        Edit
                      </CardEdit>
                    </div>
                  </div>
                </div>
              </FormTitle>
            </Card>
          </CardContentWrapper>
        </div>
      ))}
    </div>
  );
  // <!-- /.container -->
};

export default CustomRadioCard;
