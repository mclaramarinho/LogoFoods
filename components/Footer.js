export default class Footer{
    footerElement = document.getElementById("footer");
    
    constructor(companyData){
        this.footerElement.innerHTML = `
            <div class="footer_main_content">
                <div class="footer_col_1 footer_col">
                    <h2>${companyData.companyName}</h2>

                    <p>${companyData.address}</p>
                    <p><b>CNPJ:</b> ${companyData.cnpj}</p>
                    <p><b>Razão Social:</b> ${companyData.razaoSocial}</p>
                    
                </div>

                <div class="footer_col_2 footer_col">
                    <h5>INSTITUCIONAL</h5>

                    <ul class="footer_link__list">
                        ${companyData.institutionalLinks.map(link => {
                            return `
                                <li>
                                    <a href="${link.url}">${link.text}</a>
                                </li>
                            `;
                        })}
                    </ul>
                </div>
                <div class="footer_col_3 footer_col">
                    <h5>CONTATO</h5>

                    <ul class="footer_link__list">
                        ${companyData.contactLinks.map(link => {
                            return `
                                <li>
                                    <a href="${link.url}">${link.text}</a>
                                </li>
                            `;
                        })}
                    </ul>
                </div>
            </div>

            <div class="footer_col_4">
                ${companyData.socialMedia.map(sm => {
                    return `<a href="${sm.url}"><i class="bi bi-${sm.icon}"></i></a>`
                })}
            </div>
        `;
    }
}