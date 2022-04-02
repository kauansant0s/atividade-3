import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import CelularServico from '../servico/celular_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Celular } from '../modelo/celular'


// métodos da home

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllCelular() 
    }
    
    state = {
    celular:Celular,
    lista_array_dados_celular: [],
    value: null, 
    Id_pesquisar:null, 
    onChangeText: null,
    formularioId: null,
    formularioMarca:null,
    formularioModelo:null,
    formularioAno:null,
    formularioArmazenamento:null,
    formularioMemoriaRAM:null,
    formularioSO:null
    }
    
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciarCelular();
    this.findAllCelular ();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
    if (prevState.lista_array_dados_celular !== this.state.lista_array_dados_celular) {
    this.findAllCelular ();
    }
    }

    findAllCelular=()=> {
        CelularServico.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_celular: response._array,
        isLoading: false,
        })
        }), (error) => {
        console.log(error);
        }
        }


    deleteCelular=(id)=> {
    this.findCelularById(id)
    if (this.state.formularioId != null || this.state.formularioId != undefined) {
        CelularServico.deleteById(id)
    Alert.alert("Celular excluído com sucesso: ")
    }
    }
    
    atualizaCelular=(item0, item1, item2,item3,item4,item5)=> {
    let celular=new Celular()// cria objeto memória
    celular.id=item0 // seta o atributo nome do objeto 
    celular.marca=item1  
    celular.modelo=item2  
    celular.armazenamento=item3  
    celular.memoriaRAM=item4
    celular.SO=item5
    // com o valor(state) do item
    
    CelularServico.updateByObjeto(celular).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("Celular não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    
    insertCelular=(item1, item2, item3, item4, item5, item6)=> {
    let celular=new Celular()// cria objeto memória
    celular.marca=item1  
    celular.modelo=item2
    celular.ano=item3  
    celular.armazenamento=item4  
    celular.memoriaRAM=item5
    celular.SO=item6
    // com o valor(state) do item
    
    // cria um id no banco para persistir o objeto
    const insertId=CelularServico.addData(celular);
    // testa pra ver se deu certo a criação do id
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel cadastrar celular")
    }
    return celular
    }
    
    instanciarCelular=()=>{
    let celular:Celular=new Celular()// cria objeto memória
    return celular
    }
    
    
    
    findCelularById=(id)=> {
    CelularServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("ID não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    localizaCelular=(id)=> { 
    CelularServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let celularpesquisa:Celular=new Celular()// cria objeto memória
    const celularretorno=response._array.map((item,key)=>{
    celularpesquisa.id=item.id;
    celularpesquisa.marca=item.marca;
    celularpesquisa.modelo=item.modelo;
    celularpesquisa.ano=item.ano;
    celularpesquisa.armazenamento=item.armazenamento;
    celularpesquisa.memoriaRAM=item.memoriaRAM;
    celularpesquisa.SO=item.SO;
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    celular:celularpesquisa,
    formularioId: celularpesquisa.id,
    formularioMarca:celularpesquisa.marca,
    formularioModelo:celularpesquisa.modelo,
    formularioAno:celularpesquisa.ano,
    formularioArmazenamento:celularpesquisa.armazenamento,
    formularioMemoriaRAM:celularpesquisa.memoriaRAM,
    formularioSO:celularpesquisa.SO,
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("Não foi possível atualizar celular")
    }
    }), (error) => {
    console.log(error);
    }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {celular,lista_array_dados_celular,value,Id_pesquisar,formularioId,formularioMarca,formularioModelo,
        formularioAno,formularioArmazenamento,formularioMemoriaRAM,formularioSO} = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const celularList = lista_array_dados_celular.map((item, key) => {
            return (
                <> 
                    <Text >ID: {item.id} / 
                    Marca: {item.marca} / 
                    Modelo: {item.modelo} / 
                    Ano: {item.ano} / 
                    Armazenamento: {item.armazenamento} / 
                    Memória RAM: {item.memoriaRAM} / 
                    SO: {item.SO}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Crud de Celulares</Text>

                <TextInput
                    placeholder="Digite o id para procurar"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>
                    
              <Text>Marca: </Text>
                <TextInput
                    placeholder="Apple, Samsung..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioMarca => { this.setState({ formularioMarca: formularioMarca }) }}
                    value={formularioMarca}/>

                <Text>Modelo: </Text>
                <TextInput
                    placeholder="iPhone 11, Galaxy S21..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioModelo => { this.setState({ formularioModelo: formularioModelo }) }}
                    value={formularioModelo}/>

                <Text>Ano: </Text>
                <TextInput
                    placeholder="2021, 2022..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioAno => { this.setState({ formularioAno: formularioAno }) }}
                    value={formularioAno}/>

                <Text>Armazenamento: </Text>
                <TextInput
                    placeholder="64GB, 128GB..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioArmazenamento => {
                        this.setState({ formularioArmazenamento: formularioArmazenamento }) }}
                    value={formularioArmazenamento}/>

                <Text>Memória RAM: </Text>
                <TextInput
                    placeholder="4GB, 6GB..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioMemoriaRAM => { this.setState({ formularioMemoriaRAM: formularioMemoriaRAM})}}
                    value={formularioMemoriaRAM}/>

                <Text>Sistema Operacional: </Text>
                <TextInput
                    placeholder="iOS ou Android"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioSO => { this.setState({ formularioSO: formularioSO }) }}
                    value={formularioSO}/>
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioMarca == null  ? 
                        Alert.alert("O campo marca não pode ser vazio") :this.insertCelular(formularioMarca, 
                            formularioModelo, formularioAno, formularioArmazenamento, formularioMemoriaRAM, 
                            formularioSO)}} 
                        style={{ alignItems: "center", backgroundColor: '#d18681', borderRadius: 7}}>
                        <Icon name="md-add-circle-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioId == null  ? 
                        Alert.alert("Não há objeto para atualizar") :this.atualizaCelular(formularioMarca,
                        formularioModelo, formularioAno, formularioArmazenamento, formularioMemoriaRAM, formularioSO)}} 
                        style={{ alignItems: "center", backgroundColor: '#d18681', borderRadius: 7}}>
                        <Icon name="md-refresh-circle-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { Id_pesquisar == null ? 
                    Alert.alert("O campo id não pode ser vazio") : this.localizaCelular(Id_pesquisar) }} 
                    style={{ alignItems: "center", backgroundColor: '#d18681', borderRadius: 7}}>
                        <Icon name="md-search-circle-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? 
                        Alert.alert("O campo de id não pode ser vazio") : this.deleteCelular(Id_pesquisar) }} 
                        style={{ alignItems: "center", backgroundColor: '#d18681', borderRadius: 7}}>
                        <Icon name="md-close-circle-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {celularList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6ebdd',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: '#111113', 
        backgroundColor: '#acbfb7',
        borderWidth: 1,
        borderRadius: 10,
    },
    containerTouch:{
        width: 200,
        padding: 10,
        borderRadius: 20,
    }
});