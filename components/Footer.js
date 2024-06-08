export default class Footer{
    footerElement = document.getElementById("footer");
    
    constructor(companyData){
        this.footerElement.innerHTML = `
            <div class="footer_main_content">
                <div class="footer_col_1 footer_col">
                    <img src="./assets/LogoFoodsLogo.png"/>

                    <p><b>Razão Social:</b> ${companyData.razaoSocial}</p>
                    <p><b>CNPJ:</b> ${companyData.cnpj}</p>
                    
                </div>

                <div class="footer_col_2 footer_col">
                    <h5>INSTITUCIONAL</h5>

                    <ul class="footer_link__list">
                        ${this.#getListOfLinks(companyData.institutionalLinks)}
                    </ul>
                </div>
                <div class="footer_col_3 footer_col">
                    <h5>CONTATO</h5>

                    <ul class="footer_link__list">
                        ${this.#getListOfLinks(companyData.contactLinks)}
                    </ul>
                </div>
            </div>

            <div class="footer_col_4">
                ${companyData.socialMedia.map(sm => `<a href="${sm.url}"><i class="bi bi-${sm.icon}"></i></a>`).join("")}
            </div>
        `;
    }

    #getListOfLinks(urlsArr){
        let html = "";
        urlsArr.map(link => {
            html += `
                <li>
                    <a href="${link.url}">${link.text}</a>
                </li>
            `;
        })
        return html;
    }
}