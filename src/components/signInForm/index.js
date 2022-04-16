import { Box, Input, Button, Heading, Text, Anchor, Checkbox, Avatar } from '@dracula/dracula-ui'

import { useState } from 'react';
import { signIn } from '../../services/api'

export default function SignInForm() {

  const [username, setUsername] = useState("");       
  const [password, setPassword] = useState("");  
  const [isLoading, setIsLoading] = useState(false);     
  const [error, setError] = useState("");     
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [checked, setChecked] = useState(false);


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            await signIn({username, password});
            setIsSignedIn(true);
            setError("");
            setUsername("");
            setPassword("");
        } catch (error) {
            setError("Usuário ou senha inválidos.")
        }
        
        setIsLoading(false);
}



  return (
    <div className="sign-in-container d-flex align-items-center justify-content-center">

      {isSignedIn ? (
          <div className='column'>
            <Heading size='2xl' color='cyanGreen'>Hello, {username}!</Heading>
            <Box className='text-center mt-4'>
                <Button onClick={() => setIsSignedIn(false)} color='cyanGreen'>Logout</Button>
            </Box>
          </div>
      ) : (
      <Box color='black' p='md' rounded='xl'>
        <div className='mb-4'>
          <Heading size='lg'>Acessar sua conta</Heading>
        </div>
        {error && <Text size='sm' color='red'>{error}</Text>}

        <form onSubmit={handleFormSubmit}>
        <div className='mt-4'> 
          <Text size='sm'>Usuário</Text>
          <Input 
            name="user"
            id='user'
            type='text'
            value={username}
            onChange={({target}) => setUsername(target.value)}
            size="md" 
            borderSize='md' 
            color='cyan' 
            placeholder='e. g. user'
            style={{marginTop: 8}}
          ></Input>
        </div>

        <div className='mt-4'>
          <div className='d-flex justify-content-between'>
            <Text size='sm'>Sua Senha</Text>
            <Anchor size='sm' color='cyan'>Esqueceu a senha?</Anchor>
          </div>
          <Input 
            size="md" 
            borderSize='md' 
            color='cyan' 
            placeholder='*********'
            style={{marginTop: 8}}
            name="password"
            id='password'
            type='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          ></Input>
        </div>
        

        <div className='mt-4'>
          <Box>
            <Checkbox id="normal" name="normal" color="cyan" checked={checked} 
            onClick={() => setChecked(!checked)} />
            <label htmlFor="normal" className="drac-text drac-text-white">
               Eu concordo com os <Text color='cyan' size='sm'>Termos de Serviço</Text>
            </label>
          </Box>
        </div>

        <div className='mt-4 text-center'>
          <Button as='button' size='lg' color="cyanGreen" disabled={!checked}>
            {isLoading ? "Autenticando..." : "Entrar"}
          </Button>
        </div>
        </form>
        
       
      </Box>
      )}
    </div>
  )
}
