import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function ProfileData({ agent }) {

  const isAdmin = agent && agent.__t === 'Admin';
  const isProfesseur = agent && agent.__t === 'Professeur';

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
        marginTop:'1%'
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
      {isAdmin ? 'Additional admin data' : 'Additional professor data'} 
      </Typography>
      <Divider inset="none" />
      
      {isProfesseur ? (
  <CardContent
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
    gap: 1.5,
  }}
>
  
  <FormControl>
    <FormLabel>Grade (الرتبة)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={isProfesseur ? 'Grade 1' : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <FormControl>
    <FormLabel>Classe (الدرجة)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={isProfesseur ? 'Classe 1' : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>

  <FormControl>
    <FormLabel>Numéro de loyer (رقم التأجير)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={isProfesseur ? agent.num_loyer : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <FormControl>
    <FormLabel>Numéro de preuve (الرقم الاستدلالي)</FormLabel>
    <Input endDecorator={<InfoOutlined />} defaultValue={isProfesseur ? '425442' : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>

  <FormControl>
    <FormLabel>Date d'entrée dans la fonction publique (ت. و الوظيفة العمومية)</FormLabel>
    <Input endDecorator={<CreditCardIcon /> } defaultValue={isProfesseur ? agent.date_entre_ecole : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <FormControl>
    <FormLabel>Date d'entrée dans l'établissement (ت.و. المؤسسة)</FormLabel>
    <Input endDecorator={<InfoOutlined />} defaultValue={isProfesseur ? agent.date_fct_publique : 'Loading...'} disabled sx={{fontFamily:'bold'}}/>
  </FormControl>
  <Checkbox label="Change password" sx={{ gridColumn: '1/-1', my: 1 }} />
  <CardActions sx={{ gridColumn: '1/-1' }}>
    <Button variant="solid" color="primary">
      Add card
    </Button>
  </CardActions>
</CardContent>
) : isAdmin ? (
  <CardContent>
    {/* Content for Administrator */}
  </CardContent>
) : (
  <></>
)}
      
    </Card>
  );
}