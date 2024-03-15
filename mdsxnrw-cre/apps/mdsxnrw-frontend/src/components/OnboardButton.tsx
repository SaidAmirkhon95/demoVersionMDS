import React from 'react';
import Button from '@mui/material/Button';

interface OnboardButtonProps {
  subjectBase: string;
  email: string;
  tableData: Record<string, string>;
}

const OnboardButton: React.FC<OnboardButtonProps> = ({ subjectBase, email, tableData }) => {
  const handleSendEmail = () => {
    const bodyBase = 'Ich möchte folgende Connector onboarden:\n\n';

    const emailBody = Object.keys(tableData)
      .map((key) => `${key}: ${tableData[key]}`)
      .join('\n');

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subjectBase,
    )}&body=${encodeURIComponent(bodyBase + emailBody)}`;

    window.location.href = mailtoLink;
  };

  return (
    <Button
      variant='outlined'
      sx={{
        mt: 3,
        ml: 1,
        '@media (max-width: 550px)': {
          fontSize: 'small',
        },
      }}
      style={{ textTransform: 'none', whiteSpace: 'normal' }}
      size='large'
      onClick={handleSendEmail}
    >
      Send Email
    </Button>
  );
};

export default OnboardButton;
