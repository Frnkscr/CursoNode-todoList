export interface CustomAlert{
    title?: string;
    body: string;
    cancelButton?: Boolean; //estap propiedad es para indicar si va a existir el btoto de cancelar
    cancelButtonText?: string; //definr el texto que va a tener el boton
    aceptButtonText?: string;  
    type?: 'success'|'error';
}