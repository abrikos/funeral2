import {Link, useParams, useNavigate} from "react-router-dom";
import api from "../../api";
import {useEffect, useRef, useState} from "react";
import linked from "icons/linked.svg"
import reload from "icons/reload.svg"
import remove from "icons/delete.svg"
import arrow from "icons/arrow.svg"
import edit from "icons/edit.svg"
import close from "icons/close.svg"
import "./market-company.sass"
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function MarketCompany() {
    let {id} = useParams();
    const [company, setCompany] = useState()
    const [contacts, setContacts] = useState()
    const [shortEdit, setShortEdit] = useState()
    const [infoEdit, setInfoEdit] = useState()
    const [contactEdit, setContactEdit] = useState()
    const reference = useRef();
    useEffect(() => {
        loadCompany()
    }, [id])

    async function loadCompany() {
        const comp = await api.get('/companies/' + id)
        setCompany(comp)
        const cont = await api.get('/contacts/' + comp.contactId)
        cont.fio = cont.lastname + ' ' + cont.firstname + ' ' + cont.patronymic
        console.log(cont)
        setContacts(cont)
    }

    function editCompany(key, value) {
        const newCompany = {};
        newCompany[key] = value;
        console.log(newCompany)
        api.patch('/companies/' + id, newCompany)
            .then(res => {
                setCompany(res)
            })
    }

    function editContact(key, value) {
        const newCompany = {};
        if(key==='fio') {
            const parsed = value.split(' ')
            newCompany.lastname = parsed[0];
            newCompany.firstname = parsed[1];
            newCompany.patronymic = parsed[2];
        }else{
            newCompany[key] = value;
        }
        console.log(newCompany)
        api.patch('/contacts/' + company.contactId, newCompany)
            .then(res => {
                res.fio = res.lastname + ' ' + res.firstname + ' ' + res.patronymic
                setContacts(res)
            })

    }

    function uploadPhoto({target}){
        const newCompany = {...company};
        const formData = new FormData();
        for(const f of target.files){
            formData.append('file',f);
        }
        api.upload(id, formData)
            .then(res=>{
                newCompany.photos.push(res)
                setCompany(newCompany)
                target.value = null
            })
    }

    function deletePhoto(i, photo){
        api.delete(`/companies/${id}/image/${photo.name}`)
            .then(()=>{
                const newCompany = {...company};
                newCompany.photos.splice(i, 1);
                setCompany(newCompany)
            })
    }

    const navigate = useNavigate()
    function deleteCompany(){
        api.delete(`/companies/${id}`)
            .then(()=>{
                navigate('/market')
            })
    }

    return <div className="market-company">
        <input type="file" ref={reference} style={{display: 'none'}} onChange={uploadPhoto} accept="image/*"/>
        <div className="header">
            <Link className="back" to={'/market'}>
                <img src={arrow} alt={'Back'}/> К списку юридических лиц
            </Link>
            <div className="buttons">
                <button className="icon"><img src={linked} alt={'Linked'}/></button>
                <button className="icon" onClick={loadCompany}><img src={reload} alt={'Reload'}/></button>
                <button className="icon" onClick={()=>deleteCompany()}><img src={remove} alt={'Remove'}/></button>
            </div>
        </div>
        {company && <div className="company">
            {!shortEdit && <h1>
                {company.shortName}
                <img src={edit} alt={'Edit'} onClick={() => setShortEdit(company.shortName)}/>
            </h1>}
            {shortEdit && <div>
                <Input value={company.shortName} onChange={(value) => editCompany('shortName', value)}/>
                <u onClick={() => setShortEdit(false)}  style={{cursor:'pointer'}}>Завершить</u>
            </div>}

            <h2>
                ОБЩАЯ ИНФОРМАЦИЯ
                {infoEdit ? <u onClick={() => setInfoEdit(false)}  style={{cursor:'pointer'}}>Завершить</u> :
                    <img src={edit} alt={'Edit'} onClick={() => setInfoEdit(true)}/>}
            </h2>
            <table>
                <tbody>
                <tr>
                    <th>Полное описание:</th>
                    <td>
                        {infoEdit ? <Input value={company.name} onChange={v => editCompany('name', v)}/> : company.name}
                    </td>
                </tr>
                <tr>
                    <th>Договор:</th>
                    <td>
                        {infoEdit ? <Input value={company.contract.no}
                                           onChange={v => editCompany('contract', {no: v})}/> : company.contract.no}
                    </td>
                </tr>
                <tr>
                    <th>Форма:</th>
                    <td>
                        {infoEdit ? <Input value={company.businessEntity}
                                           onChange={v => editCompany('businessEntity', v)}/> : company.businessEntity}
                    </td>
                </tr>
                <tr>
                    <th>Тип:</th>
                    <td>
                        {infoEdit ? <Input value={company.type.join(', ')}
                                           onChange={v => editCompany('type', v.split(','))}/> : company.type.join(', ')}
                    </td>
                </tr>
                </tbody>
            </table>
            <br/>
            <div className="line"/>
            <br/>
            <h2>
                КОНТАКТНЫЕ ДАННЫЕ
                {contactEdit ? <u onClick={() => setContactEdit(false)} style={{cursor:'pointer'}}>Завершить</u> :
                    <img src={edit} alt={'Edit'} onClick={() => setContactEdit(true)}/>}
            </h2>
            {contacts && <table>
                <tbody>
                <tr>
                    <th>ФИО:</th>
                    <td>
                        {contactEdit ?
                            <Input value={contacts.fio} onChange={v => editContact('fio', v)}/> : contacts.fio}
                    </td>
                </tr>

                <tr>
                    <th>Телефон:</th>
                    <td>
                        {contactEdit ?
                            <Input value={contacts.phone} onChange={v => editContact('phone', v)}/> : contacts.phone}
                    </td>
                </tr>

                <tr>
                    <th>Email:</th>
                    <td>
                        {contactEdit ?
                            <Input value={contacts.email} onChange={v => editContact('email', v)}/> : contacts.email}
                    </td>
                </tr>

                </tbody>
            </table>}
            <br/>
            <div className="line"/>
            <br/>
            <h2>ПРИЛОЖЕННЫЕ ФОТО</h2>
            <div className="photos">
            {company.photos.map((photo,i)=><div key={i}>
                <div className={'photo-container'}>
                    <img src={photo.thumbpath} alt={photo.name} className={'preview'} />
                    <img src={close} alt={'Delete'} className={'delete'} onClick={()=>deletePhoto(i, photo)}/>
                </div>
                <div className="photo-name">{photo.name}</div>
                <div className="photo-date">{photo.date}</div>
            </div>)}

            </div>
            <Button label={'Добавить изображение'} onClick={()=>reference.current.click()}/>
        </div>}

    </div>
}