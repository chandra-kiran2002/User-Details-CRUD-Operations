class Users {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.modalObj
        this.fetchData()
        this.createAddButton()
        this.createTable()
        this.displayData()
    }

    async fetchData() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error('Could not fetch data');
        }
        this.data = response.json();
        return this.data;
    }

    async displayData() {
        let temp = await this.fetchData();
        if (!this.data) {
            console.error('No data available');
            return;
        }
        temp.forEach(record=> {
            this.addObjectToTable(record)
        });
    }

    async addData(obj) {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      });
      const data = await response;
      return data;
    }

    async updateData(id, updateObj) {
        console.log('${this.apiUrl}/${id}')
      const response = await fetch(this.apiUrl +"/" +id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateObj)
      });
      const data = await response
      return data;
    }

    async deleteData(id) {
      const response = await fetch(this.apiUrl +"/" +id, {
        method: 'DELETE'
      });
      return await response;
    }
    
    createAddButton() {
        let div = document.createElement('div');
        div.id = 'top-right';
        div.style.display = 'flex'
        div.style.justifyContent = 'flex-end'
        div.style.top = '10px';
        div.style.right = '10px';
        div.style.margin = '2%'
    
        let addButton = document.createElement('button');
        addButton.innerText = 'Add';
        addButton.className = 'btn btn-primary';
        addButton.dataset.toggle = "modal";
        addButton.dataset.target = "#myModal";
        addButton.addEventListener('click', () => {
            this.openModal();
        });
    
        div.appendChild(addButton);
    
        document.body.appendChild(div);
    }

    createTable() {
        let bootstrapTable = document.createElement("table");
        bootstrapTable.classList.add('table', 'table-striped')
        bootstrapTable.id = 'table'
        bootstrapTable.classList.add('table-hover')

        let thead = document.createElement("thead");
        thead.classList.add('table-dark')
        let headerRow = document.createElement("tr");

        let idCol = document.createElement("th");
        idCol.innerText = "ID";
        headerRow.appendChild(idCol);
        
        let avatarCol = document.createElement("th");
        avatarCol.innerText = "Avatar";
        headerRow.appendChild(avatarCol);

        let nameCol = document.createElement("th");
        nameCol.innerText = "Name";
        headerRow.appendChild(nameCol);

        let gmailCol = document.createElement("th");
        gmailCol.innerText = "Gmail";
        headerRow.appendChild(gmailCol);
        
        let editButtonCol = document.createElement("th");
        editButtonCol.innerText = "Edit";
        headerRow.appendChild(editButtonCol);
        
        let deleteButtonCol = document.createElement("th");
        deleteButtonCol.innerText = "Delete";
        headerRow.appendChild(deleteButtonCol);
        
        thead.appendChild(headerRow);
        bootstrapTable.appendChild(thead);
        
        let tbody = document.createElement("tbody");
        tbody.id = 'tableid'
        bootstrapTable.appendChild(tbody);
        document.body.appendChild(bootstrapTable);
    }

    addObjectToTable(object) {
        let table = document.getElementById('tableid');
        
        let row = table.insertRow();
        row.id = 'row' + object.id
        let idCell = row.insertCell(0);
        idCell.innerText = object.id;
        
    
        let avatarCell = row.insertCell(1);
        avatarCell.style.display = 'flex'
        avatarCell.style.justifyContent = 'center'
        let avatarImg = document.createElement('img');
        avatarImg.style.height = '100px'
        avatarImg.style.width = '100px'
        
        avatarImg.src = object.avatar;
        avatarCell.appendChild(avatarImg);
    
        let nameCell = row.insertCell(2);
       
        nameCell.innerText = object.name;

        let gamilCell = row.insertCell(3);
       
        gamilCell.innerText = object.gmail;
    
        let editCell = row.insertCell(4);
        let editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'btn btn-primary';
        editButton.dataset.toggle = "modal";
        editButton.dataset.target = "#editmyModal";
        editButton.addEventListener('click', async () => {
            this.editopenModal(object);
        });
    
        editCell.appendChild(editButton);
        
        let deleteCell = row.insertCell(5);
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'btn btn-danger';
        deleteButton.onclick = async () => {
            this.showConfirmModal(object)
        };
        deleteCell.appendChild(deleteButton);
    }

    createModal() {
        let modalDiv = document.createElement('div');
        modalDiv.className = 'modal';
        modalDiv.id = 'myModal';
        modalDiv.setAttribute('tabindex', '-1');

        let modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog';

        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        let modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        let modalTitle = document.createElement('h5');
        modalTitle.innerText = 'Add new Data';
        modalHeader.appendChild(modalTitle);

        let modalBody = document.createElement('div');
        modalBody.className = 'modal-body';

        ['Name', 'Email', 'PhotoLink'].forEach((placeholder) => {
            let inputGroup = document.createElement('div');
            inputGroup.className = 'input-group mb-3';

            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control';
            input.id = 'input'+placeholder
            input.placeholder = placeholder;

            inputGroup.appendChild(input);
            modalBody.appendChild(inputGroup);
        })

        let modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';

        let cancelButton = document.createElement('button');
        cancelButton.className = 'btn btn-secondary';
        cancelButton.setAttribute('data-bs-dismiss', 'modal');
        cancelButton.innerText = 'Close';
        cancelButton.addEventListener('click', function(){
            this.modalObj.hide()
                this.modalObj.dispose()
                this.modalObj = null
                let child = document.getElementById('myModal')
                child.parentNode.removeChild(child)
        })
        modalFooter.appendChild(cancelButton);
        
        let saveButton = document.createElement('button');
        saveButton.className = 'btn btn-primary';
        saveButton.innerText = 'Add Data';
        saveButton.addEventListener('click', async () =>{
            let newData = {
                name: document.getElementById('inputName').value,
                gmail :document.getElementById('inputEmail').value,
                avatar:document.getElementById('inputPhotoLink').value
            }

            const response = await this.addData(newData)
            
            if(response.ok){
                let temp  = await response.json()
                console.log(temp)
                newData['id'] = temp.id
                this.addObjectToTable(temp)
                document.getElementById('inputName').value = ''
                document.getElementById('inputEmail').value = ''
                document.getElementById('inputPhotoLink').value = ''
                this.modalObj.hide()
                this.modalObj.dispose()
                this.modalObj = null
                let child = document.getElementById('myModal')
                child.parentNode.removeChild(child)

            }

    });
        modalFooter.appendChild(saveButton);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modalDiv.appendChild(modalDialog);
        
        document.body.appendChild(modalDiv);
        
        this.modalObj = new bootstrap.Modal(document.getElementById('myModal'));
    }

    openModal() {
        this.createModal();
        this.modalObj.show();
    }

    createEditModal(data) {
        console.log(data)
        let modalDiv = document.createElement('div');
        modalDiv.className = 'modal';
        
        modalDiv.id = 'editmyModal';
        
        let modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog';

        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        let modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        let modalTitle = document.createElement('h5');
        modalTitle.innerText = 'Edit Data';
        modalHeader.appendChild(modalTitle);

        let modalBody = document.createElement('div');
        modalBody.className = 'modal-body';

        let idInput = document.createElement('input');
        idInput.type = 'text';
        idInput.className = 'form-control my-2';
        idInput.value = data.id;
        idInput.disabled = true

        let nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'form-control my-2';
        nameInput.value = data.name;

        let emailInput = document.createElement('input');
        emailInput.type = 'text';
        emailInput.className = 'form-control my-2';
        emailInput.value = data.gmail;

        let photoLinkInput = document.createElement('input');
        photoLinkInput.type = 'text';
        photoLinkInput.className = 'form-control my-2';
        photoLinkInput.value = data.avatar;

        modalBody.append(idInput,nameInput, emailInput, photoLinkInput);

        let modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';

        let closeButton = document.createElement('button');
        closeButton.className = 'btn btn-secondary';
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', function(){
                this.modalObj = null
                console.log("sx")
                let child = document.getElementById('editmyModal')
                child.parentNode.removeChild(child)
        })
        modalFooter.appendChild(closeButton);

        let saveButton = document.createElement('button');
        saveButton.className = 'btn btn-primary';
        saveButton.innerText = 'Save changes';
        saveButton.addEventListener('click', async () => {
            let editdata = {
                name : nameInput.value,
                gmail :emailInput.value,
                avatar:photoLinkInput.value
            }
            let response = await this.updateData(data.id, editdata)
            if(response.ok){
                let newdata = await response.json()
                console.log(newdata);
                this.updateTableRow(newdata.id, newdata)
                this.modalObj.hide()
                this.modalObj.dispose()
                this.modalObj = null
                let child = document.getElementById('editmyModal')
                child.parentNode.removeChild(child)
                
            }
        });
        modalFooter.appendChild(saveButton);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modalDiv.appendChild(modalDialog);

        document.body.appendChild(modalDiv);


        this.modalObj =  new bootstrap.Modal(document.getElementById('editmyModal'));
    }

    editopenModal(data) {
        this.createEditModal(data)
        this.modalObj.show();
       
    }

    updateTableRow(id, newData) {
        let row = document.getElementById('row' + id);
    
        if (row) {
            let idCell = row.cells[0];
            let pictureCell = row.cells[1];
            let nameCell = row.cells[2];
            let emailCell = row.cells[3];
            idCell.innerHTML = newData.id;
    
            let imgTag = document.createElement('img');
            imgTag.src = newData.avatar;
            pictureCell.innerHTML = ''; 
            pictureCell.appendChild(imgTag); 
            
            nameCell.innerHTML = newData.name;
            emailCell.innerHTML = newData.gmail;
            row.classList.add('table-success'); 

            setTimeout(() => {
                row.classList.remove('table-success');
            }, 2000);
        } else {
            console.log('Row with id "row${id}" not found');
        }
    }

    showConfirmModal(object) {
        let modal = document.createElement("div");
        modal.className = "modal";
        modal.tabIndex = "-1";
        modal.role = "dialog";
    
        let modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog";
        modal.appendChild(modalDialog);
    
        let modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        modalDialog.appendChild(modalContent);
    
        // Modal Head
        let modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";
        modalContent.appendChild(modalHeader);
    
        let modalTitle = document.createElement("h5");
        modalTitle.className = "modal-title";
        modalTitle.textContent = "Confirmation";
        modalHeader.appendChild(modalTitle);
    
        // Modal Body
        let modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.textContent = "Are you sure you want to delete this?";
        modalContent.appendChild(modalBody);
    
        // Modal Footer
        let modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalContent.appendChild(modalFooter);
    
        let cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.className = "btn btn-secondary";
        cancelButton.textContent = "Cancel";
        cancelButton.onclick = async () => {
         
            $(modal).modal('hide'); 
                
             
        };
        modalFooter.appendChild(cancelButton);
    
        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger";
        deleteButton.textContent = "Confirm";
        deleteButton.onclick = async () => {
            // Write your delete logic here
            console.log(object)
            let response = await this.deleteData(object.id);
            if (response.ok) {
                let row = document.getElementById('row' + object.id);
                if(row) {
                    
                  
                  $(modal).modal('hide'); 
                  row.classList.add('table-danger'); 
                    setTimeout(() => {
                        row.classList.remove('table-danger');
                        row.parentNode.removeChild(row);
                    }, 1000);
                }
            }
        };
        modalFooter.appendChild(deleteButton);
    
        document.body.appendChild(modal);
        $(modal).modal('show');
    }   
}


const apiHandler = new Users('https://65a8ca65219bfa37186795e7.mockapi.io/api/users');