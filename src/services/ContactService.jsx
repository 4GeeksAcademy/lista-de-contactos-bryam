const ContactService = {}

//GET ALL AGENDAS
ContactService.getAllAgendas = async () => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

//GET AGENDA
ContactService.getAgenda = async (slug) => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/' + slug)
        if (!resp.ok) {
            await ContactService.createAgenda(slug);
            return { message: "Creada nueva agenda" };
        }
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

// CREATE AGENDA
ContactService.createAgenda = async (slug) => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/' + slug, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const updatedAgenda = await ContactService.getAgenda('bryam');
        return updatedAgenda
    } catch (error) {
        console.log(error)
    }
}


// CREATE CONTACT
ContactService.createContact = async (Contact) => {
    try {
       await fetch(`https://playground.4geeks.com/contact/agendas/bryam/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Contact)
        })

        return ContactService.getAgenda('bryam')
    } catch (error) {
        console.log(error)
    }
}

// DELETE AGENDA
ContactService.deleteContact = async (slug, id) => {
    try {
        console.log(id);

        await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
            method: 'DELETE'
        })
        return ContactService.getAgenda('bryam')
    } catch (error) {
        console.log(error)
    }
}

// MODIFICAR AGENDA
ContactService.editContact = async (slug, id, formData) => {
    try {
        const resp = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        return ContactService.getAgenda(slug)
    } catch (error) {
        console.log(error)
    }
}

export default ContactService