function DateControl(date){
    let data = new Date(parseInt(date));
    let passou = Date.now() - data;
    let segundos = passou / 1000;
    let minutos = segundos / 60;
    let horas = minutos / 60;
    let dias = horas / 24;
    let meses = dias / 30;
    let anos = dias / 365;

    this.getStatus = () => {
        if(segundos < 60){
            return 'Agora mesmo';
        }else{
            if(minutos < 2){
                return '1 min atrás';
            }else if(minutos < 60){
                return Math.trunc(minutos) + ' min atrás';
            }else{
                if(horas < 2){
                    return '1h atrás';
                }else if(horas < 24){
                    return Math.trunc(horas) + 'h atrás';
                }else{
                    if(dias < 2){
                        return '1 dia atrás';
                    }else if(dias < 30){
                        return Math.trunc(dias) + ' dias atrás';
                    }else{
                        if(meses < 2){
                            return '1 mês atrás';
                        }else if(dias < 365){
                            return Math.trunc(meses) + ' meses atrás';
                        }else{
                            if(anos < 2){
                                return '1 ano atrás';
                            }else{
                                return Math.trunc(anos) + ' anos atrás';
                            }
                        }
                    }
                }
            }
        }
    }
}

export default DateControl;