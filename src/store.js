import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import {
  API
} from "aws-amplify";
import {
  listCustomers,
  listQuotes,
  listSmInstallments
} from "../src/graphql/queries";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(54, 162, 235, 0.2), rgba(54, 162, 235, 0.2)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    usuario: "",
    organizationID: "",
    role: "",
    leads: [],
    leads_seek: [],
    lead: [],
    listphone: [],
    listemails: [],
    listaddress: [],
    body: "",
    bodyquote: "",
    bodyinst: "",
    conclusion: "",
    date: new Date().toDateString(),
    response: "",
    items: []
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    SetLead(state, lead) {
      state.lead = lead;
    },

    SetResponse(state, resp) {
      state.response = resp;
    },

    SetLeads(state, p_leads) {
      state.leads = p_leads;
    },
    SetLeads_Seek(state, p_leads) {
      state.leads_seek = p_leads;
    },
    SetPhone(state, p_phones) {
      state.listphone = p_phones;
    },

    SetConclusion(state, p_conc) {
      state.conclusion = p_conc;
    },

    GetConclusion(state) {
      return state.conclusion;
    },

    GetPhone(state) {
      return state.listphone;
    },

    SetEmails(state, p_email) {
      state.listemails = p_email;
    },

    GetEmails(state) {
      return state.listemails;
    },

    SetAddress(state, p_address) {
      state.listaddress = p_address;
    },

    GetAddress(state) {
      return state.listaddress;
    },

    async SetBody(state, p_item) {

      var quotes = [];
      var leads = [];
      var inst = [];
      var installments = [];
      var services = [];
      var editedItemLeads = [];
      var q_services = [];
      this.phones = [];
      const seq = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: p_item.PK,
            },
            SK: {
              eq: p_item.SK,
            },
            indexs: {
              eq: "2",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      var data = seq.data.listQuotes;

      for (let i = 0; i < data.length; i++) {
        if (data[i].entityType == "QUOTE") {
          quotes.push(data[i]);
        }
        if (data[i].entityType == "CUSTOMER") {
          leads.push(data[i]);
        }
        if (data[i].entityType == "INSTALLMENT") {
          inst.push(data[i]);
        }
        if (data[i].entityType == "QUOTEITEM") {
          services.push(data[i]);
        }
      }

      for (let j = 0; j < services.length; j++) {
        q_services.push(services[j]);
      }

      for (let k = 0; k < inst.length; k++) {
        installments.push(inst[k]);
      }
      console.log(installments);
      for (let l = 0; l < leads.length; l++) {
        editedItemLeads = leads[l];
      }
      const item = quotes[0];

      var tabla_installments = '';
      var detalle_installments = '';

      if (item.isInstallment == "true") {
        for (let i = 0; i < installments.length; i++) {
          tabla_installments = tabla_installments + "<tr style='mso-yfti-irow:1'>" +
            "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #EEEEEE 1.0pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
            "<p class=MsoNormal style='line-height:11.25pt'>" + installments[i].startDate + "<br>" +
            "</td>" +
            "<td valign=top style='border:none;border-bottom:solid #EEEEEE 1.0pt; padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
            "<p class=MsoNormal align=right style='text-align:right;line-height:11.25pt'>$&nbsp;" + parseFloat(installments[i].amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "</p>" +
            "</td > "
          "</tr>";
        }

        detalle_installments = "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:18.75pt'>We are happy to provide you with installment options. Below is your installment schedule of payments for your reference:</p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal><b>Installment Date <o:p></o:p></b></p>" +
          "</td>" +
          "<td width='35%' valign=top style='width:35.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b><span style='color:black'>Amount to be Paid</span><o:p></o:p></b></p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:2'>" +
          "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal><b>Down Payment<o:p></o:p></b></p>" +
          "</td>" +
          "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b>$&nbsp;" + parseFloat(item.downPayment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
          "</td>" +
          "</tr>" +
          tabla_installments +
          "</table>"
      }

      var conclu = item.conclusion.replace("[CLIENT_NAME]", item.customerName);
      conclu = conclu.replace(/\n/g, "<br />");

      var tabla_service = '';
      for (let i = 0; i < q_services.length; i++) {
        tabla_service = tabla_service + "<tr style='mso-yfti-irow:1'>" +
          "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #EEEEEE 1.0pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:11.25pt'>" + q_services[i].smName + "<br>" +
          "<i><span style='font-size:10.0pt;color:#2A2B2A'>" + q_services[i].description.replace(/\n/g, "<br />") + "</span></i></p>" +
          "</td>" +
          "<td valign=top style='border:none;border-bottom:solid #EEEEEE 1.0pt; padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right;line-height:11.25pt'>$&nbsp;" + parseFloat(q_services[i].price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "</p>" +
          "</td > "
        "</tr>";

      }

      var tabla_detalle = '';
      if (JSON.parse(editedItemLeads.l_email)[0]) {
        for (let i = 0; i < JSON.parse(editedItemLeads.l_email).length; i++) {
          tabla_detalle = tabla_detalle +
            "<p class=MsoNormal style='line-height:15.0pt'>" + JSON.parse(editedItemLeads.l_email)[i].email + "</p>";
        }
      }

      var discount = '';
      var type = '';
      if (item.isDiscount == 'Y') {
        if (JSON.parse(item.l_discount)[0].discount_type == 'P') {
          type = '%';
        } else {
          type = '$';
        }
        discount = discount + "<tr style='mso-yfti-irow:3'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b>Total Discount: " + type + "&nbsp;" + parseFloat(item.discount_value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
          "</td></tr>"
      }

      state.body = "<html><canvas>" +
        "<meta http-equiv=Content-Type content='text/html; charset=unicode'>" +
        "<meta name=ProgId content=Word.Document>" +
        "<meta name=Generator content='Microsoft Word 15'>" +
        "<meta name=Originator content='Microsoft Word 15'>" +
        "<link rel=File-List href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/filelist.xml'>" +
        "<link rel=Edit-Time-Data href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/editdata.mso'>" +
        "<link rel=themeData href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/themedata.thmx'>" +
        "<link rel=colorSchemeMapping href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/colorschememapping.xml'>" +
        "</head>" +
        "<body  lang=ES-US link=blue vlink=purple style='tab-interval:35.4pt;word-wrap:break-word'> " +
        "<table>" +
        "<tr> " +
        "<td width='50%'> " +
        "<img src='http://localhost:8080/assets/bizPlanEasyLogo.png'/>" +
        "</td> " +
        "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
        "<td width='50%' valign=top style='padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right;line-height:15.0pt'><ahref='mailto:support@bizplaneasy.com'>support@bizplaneasy.com</a><br>877-533-2075 </p>" +
        "</td>" +
        "</tr> " +
        "</table>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>" +
        "<td valign=top style='padding:.75pt .75pt .75pt .75pt'>" +
        "<p class=MsoNormal style='line-height:15.0pt'>" + item.customerName + "</p>" +
        tabla_detalle +
        "</td>" +
        "<td valign=top style='padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right;line-height:15.0pt'>" + state.date + "</p>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "<br> <br>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style = 'mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes' >" +
        "<td valign=top style='padding:.75pt .75pt .75pt .75pt'> " +
        "<p class=MsoNormal style='margin-bottom:12.0pt;text-align:justify; line-height:15.0pt'><strong><span style='font-family:'Calibri',sans-serif'>Subject:</span></strong>" +
        item.subject + "<br> <br>" +
        conclu + "</p>" +
        "</td></tr></table>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
        "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal><b>Services <o:p></o:p></b></p>" +
        "</td>" +
        "<td width='35%' valign=top style='width:35.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b><span style='color:black'>Price </span><o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" + tabla_service +
        "<tr style='mso-yfti-irow:3'>" +
        "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b>Total:$&nbsp;" + parseFloat(item.quotationAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" +
        discount +
        "<tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes'>" +
        "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b>Final Total:$&nbsp;" + parseFloat(item.finalAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        detalle_installments +
        "<p class=MsoNormal><span lang=EN-US style='display:none;mso-hide:all;mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>" +
        "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal style='line-height:18.75pt'><br><br><br>" +
        "<em><span style='font-size:9.0pt;font-family:'Calibri',sans-serif'>This is computer generated quotation. Does not require a signature.</span></em></p>" +
        "</td></tr>" +
        "</table>" +
        "<p class=MsoNormal><span lang=EN-US style='font-size:10.5pt;mso-ansi-language:EN-US'>In order for us to continue with the order, click on the below button to confirm order through payment <o:p></o:p></span></p>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 style='mso-cellspacing:1.5pt;margin-left:22.5pt;mso-yfti-tbllook:1184; mso-padding-alt:0in 0in 0in 0in'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>" +
        "<td style='background:#4DB24C;padding:7.5pt 11.25pt 7.5pt 11.25pt;border-radius: 5px'>" +
        "<p class=MsoNormal align=center style='margin-bottom:7.5pt;text-align:center'><a href='https://master.dvyyvkccvxz1k.amplifyapp.com/payment?id=" + item.id + '&orgid=' + item.PK + "'><span style='font-size:13.5pt;font-family:'Arial',sans-serif;color:white;letter-spacing:.75pt;text-decoration:none;text-underline:none'>Confirm Order </span></a></p>" +
        "</td></tr>" +
        "</table>" +
        "</body></canvas></html>";
    },


    async SetBodyQuote(state, data) {
      var quotes = [];
      var leads = [];
      var inst = [];
      var installments = [];
      var services = [];
      var editedItemLeads = [];
      var q_services = [];
      this.phones = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].entityType == "QUOTE") {
          quotes.push(data[i]);
        }
        if (data[i].entityType == "CUSTOMER") {
          leads.push(data[i]);
        }
        if (data[i].entityType == "INSTALLMENT") {
          inst.push(data[i]);
        }
        if (data[i].entityType == "QUOTEITEM") {
          services.push(data[i]);
        }
      }

      for (let j = 0; j < services.length; j++) {
        q_services.push(services[j]);
      }

      for (let k = 0; k < inst.length; k++) {
        installments.push(inst[k]);
      }
      console.log(installments);
      for (let l = 0; l < leads.length; l++) {
        editedItemLeads = leads[l];
      }
      const item = quotes[0];

      var tabla_installments = '';
      var detalle_installments = '';

      if (item.isInstallment == "true") {

        for (let i = 0; i < installments.length; i++) {
          tabla_installments = tabla_installments + "<tr style='mso-yfti-irow:1'>" +
            "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #EEEEEE 1.0pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
            "<p class=MsoNormal style='line-height:11.25pt'>" + installments[i].startDate + "<br>" +
            "</td>" +
            "<td valign=top style='border:none;border-bottom:solid #EEEEEE 1.0pt; padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
            "<p class=MsoNormal align=right style='text-align:right;line-height:11.25pt'>$&nbsp;" + parseFloat(installments[i].amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "</p>" +
            "</td > "
          "</tr>";

        }

        detalle_installments = "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:18.75pt'>We inform you that you successfully paid the down payment:</p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:2'>" +
          "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal><b>Down Payment<o:p></o:p></b></p>" +
          "</td>" +
          "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b>$&nbsp;" + parseFloat(item.downPayment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:18.75pt'>We are happy to provide you with installment options. Below is your installment schedule of payments for your reference:</p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal><b>Installment Date <o:p></o:p></b></p>" +
          "</td>" +
          "<td width='35%' valign=top style='width:35.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b><span style='color:black'>Amount to be Paid</span><o:p></o:p></b></p>" +
          "</td>" +
          "</tr>" +
          tabla_installments +
          "</table>"
      }


      var tabla_service = '';
      for (let i = 0; i < q_services.length; i++) {
        tabla_service = tabla_service + "<tr style='mso-yfti-irow:1'>" +
          "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #EEEEEE 1.0pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:11.25pt'>" + q_services[i].smName + "<br>" +
          "<i><span style='font-size:10.0pt;color:#2A2B2A'>" + q_services[i].description.replace(/\n/g, "<br />") + "</span></i></p>" +
          "</td>" +
          "<td valign=top style='border:none;border-bottom:solid #EEEEEE 1.0pt; padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right;line-height:11.25pt'>$&nbsp;" + parseFloat(q_services[i].price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "</p>" +
          "</td > "
        "</tr>";

      }

      var tabla_detalle = '';
      if (JSON.parse(editedItemLeads.l_email)[0]) {
        for (let i = 0; i < JSON.parse(editedItemLeads.l_email).length; i++) {
          tabla_detalle = tabla_detalle +
            "<p class=MsoNormal style='line-height:15.0pt'>" + JSON.parse(editedItemLeads.l_email)[i].email + "</p>";
        }
      }

      var discount = '';
      var type = '';
      if (item.isDiscount == 'Y') {
        if (JSON.parse(item.l_discount)[0].discount_type == 'P') {
          type = '%';
        } else {
          type = '$';
        }
        discount = discount + "<tr style='mso-yfti-irow:3'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b>Total Discount: " + type + "&nbsp;" + parseFloat(item.discount_value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
          "</td></tr>"
      }

      state.bodyquote = "<html><canvas>" +
        "<meta http-equiv=Content-Type content='text/html; charset=unicode'>" +
        "<meta name=ProgId content=Word.Document>" +
        "<meta name=Generator content='Microsoft Word 15'>" +
        "<meta name=Originator content='Microsoft Word 15'>" +
        "<link rel=File-List href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/filelist.xml'>" +
        "<link rel=Edit-Time-Data href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/editdata.mso'>" +
        "<link rel=themeData href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/themedata.thmx'>" +
        "<link rel=colorSchemeMapping href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/colorschememapping.xml'>" +
        "</head>" +
        "<body  lang=ES-US link=blue vlink=purple style='tab-interval:35.4pt;word-wrap:break-word'> " +
        "<table>" +
        "<tr> " +
        "<td width='50%'> " +
        "<img src='http://localhost:8080/assets/bizPlanEasyLogo.png'/>" +
        "</td> " +
        "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
        "<td width='50%' valign=top style='padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right;line-height:15.0pt'><ahref='mailto:support@bizplaneasy.com'>support@bizplaneasy.com</a><br>877-533-2075 </p>" +
        "</td>" +
        "</tr> " +
        "</table>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>" +
        "<td valign=top style='padding:.75pt .75pt .75pt .75pt'>" +
        "<p class=MsoNormal style='line-height:15.0pt'> Dear Customer:" + JSON.parse(editedItemLeads.l_smName)[0].fullName + "</p>" +
        "</td>" +
        "<td valign=top style='padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right;line-height:15.0pt'>" + state.date + "</p>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "<br> <br>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style = 'mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes' >" +
        "<td valign=top style='padding:.75pt .75pt .75pt .75pt'> " +
        "<p class=MsoNormal style='margin-bottom:12.0pt;text-align:justify; line-height:15.0pt'><strong><span style='font-family:'Calibri',sans-serif'>We are pleased to inform you that you have made a payment for the following services:</span></strong>" +

        "</td></tr></table>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
        "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal><b>Services <o:p></o:p></b></p>" +
        "</td>" +
        "<td width='35%' valign=top style='width:35.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b><span style='color:black'>Price </span><o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" + tabla_service +
        "<tr style='mso-yfti-irow:3'>" +
        "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b>Total:$&nbsp;" + parseFloat(item.quotationAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" +
        discount +
        "<tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes'>" +
        "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b>Final Total:$&nbsp;" + parseFloat(item.finalAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        detalle_installments +
        "<p class=MsoNormal><span lang=EN-US style='display:none;mso-hide:all;mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>" +
        "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal style='line-height:18.75pt'><br><br><br>" +
        "<em><span style='font-size:9.0pt;font-family:'Calibri',sans-serif'>This is computer generated quotation. Does not require a signature.</span></em></p>" +
        "</td></tr>" +
        "</table>" +
        "</body></canvas></html>";

    },

    async SetBodyInst(state, item) {

      var tabla_installments = '';
      var detalle_installments = '';
      var installments = [];
      if (item.is_installment == "true") {
        const all = await API.graphql({
          query: listSmInstallments,
          variables: {
            filter: {
              id_quote: {
                eq: item.id
              }
            }
          },
        });

        installments = all.data.listSmInstallments.items;

        for (let i = 0; i < installments.length; i++) {
          tabla_installments = tabla_installments + "<tr style='mso-yfti-irow:1'>" +
            "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #EEEEEE 1.0pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
            "<p class=MsoNormal style='line-height:11.25pt'>" + installments[i].start_date + "<br>" +
            "</td>" +
            "<td valign=top style='border:none;border-bottom:solid #EEEEEE 1.0pt; padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
            "<p class=MsoNormal align=right style='text-align:right;line-height:11.25pt'>$&nbsp;" + parseFloat(installments[i].amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "</p>" +
            "</td > "
          "</tr>";

        }

        detalle_installments = "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:18.75pt'>We inform you that you successfully paid the down payment:</p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:2'>" +
          "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal><b>Down Payment<o:p></o:p></b></p>" +
          "</td>" +
          "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b>$&nbsp;" + parseFloat(item.payment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:18.75pt'>We are happy to provide you with installment options. Below is your installment schedule of payments for your reference:</p>" +
          "</td>" +
          "</tr>" +
          "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
          "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal><b>Installment Date <o:p></o:p></b></p>" +
          "</td>" +
          "<td width='35%' valign=top style='width:35.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b><span style='color:black'>Amount to be Paid</span><o:p></o:p></b></p>" +
          "</td>" +
          "</tr>" +
          tabla_installments +
          "</table>"
      }


      var tabla_service = '';
      for (let i = 0; i < item.services.items.length; i++) {
        tabla_service = tabla_service + "<tr style='mso-yfti-irow:1'>" +
          "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #EEEEEE 1.0pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal style='line-height:11.25pt'>" + item.services.items[i].name + "<br>" +
          "<i><span style='font-size:10.0pt;color:#2A2B2A'>" + item.services.items[i].description.replace(/\n/g, "<br />") + "</span></i></p>" +
          "</td>" +
          "<td valign=top style='border:none;border-bottom:solid #EEEEEE 1.0pt; padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right;line-height:11.25pt'>$&nbsp;" + parseFloat(item.services.items[i].price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "</p>" +
          "</td > "
        "</tr>";

      }

      var tabla_detalle = '';
      for (let i = 0; i < item.leads.items[0].smLeadsdetails.items.length; i++) {
        if (item.leads.items[0].smLeadsdetails.items[i].type != 'A') {
          tabla_detalle = tabla_detalle +
            "<p class=MsoNormal style='line-height:15.0pt'>" + item.leads.items[0].smLeadsdetails.items[i].value + "</p>";
        }
      }

      var discount = '';
      var type = '';
      if (item.discount_id != null) {
        if (item.discount_type == 'P') {
          type = '%';
        } else {
          type = '$';
        }
        discount = discount + "<tr style='mso-yfti-irow:3'>" +
          "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
          "<p class=MsoNormal align=right style='text-align:right'><b>Total Discount: " + type + "&nbsp;" + parseFloat(item.discount_value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
          "</td></tr>"
      }

      state.bodyinst = "<html><canvas>" +
        "<meta http-equiv=Content-Type content='text/html; charset=unicode'>" +
        "<meta name=ProgId content=Word.Document>" +
        "<meta name=Generator content='Microsoft Word 15'>" +
        "<meta name=Originator content='Microsoft Word 15'>" +
        "<link rel=File-List href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/filelist.xml'>" +
        "<link rel=Edit-Time-Data href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/editdata.mso'>" +
        "<link rel=themeData href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/themedata.thmx'>" +
        "<link rel=colorSchemeMapping href='FW%20Your%20Quote%20from%20BizPlanEasy%20for%20FormationLicenses_archivos/colorschememapping.xml'>" +
        "</head>" +
        "<body  lang=ES-US link=blue vlink=purple style='tab-interval:35.4pt;word-wrap:break-word'> " +
        "<table>" +
        "<tr> " +
        "<td width='50%'> " +
        "<img src='http://localhost:8080/assets/bizPlanEasyLogo.png'/>" +
        "</td> " +
        "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
        "<td width='50%' valign=top style='padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right;line-height:15.0pt'><ahref='mailto:support@bizplaneasy.com'>support@bizplaneasy.com</a><br>877-533-2075 </p>" +
        "</td>" +
        "</tr> " +
        "</table>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>" +
        "<td valign=top style='padding:.75pt .75pt .75pt .75pt'>" +
        "<p class=MsoNormal style='line-height:15.0pt'> Dear Customer:" + item.leads.items[0].name + " " + item.leads.items[0].lastname + "</p>" +
        "</td>" +
        "<td valign=top style='padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right;line-height:15.0pt'>" + state.date + "</p>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "<br> <br>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style = 'mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes' >" +
        "<td valign=top style='padding:.75pt .75pt .75pt .75pt'> " +
        "<p class=MsoNormal style='margin-bottom:12.0pt;text-align:justify; line-height:15.0pt'><strong><span style='font-family:'Calibri',sans-serif'>We are pleased to inform you that you have made a payment for the following services:</span></strong>" +

        "</td></tr></table>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>" +
        "<td width='65%' valign=top style='width:65.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal><b>Services <o:p></o:p></b></p>" +
        "</td>" +
        "<td width='35%' valign=top style='width:35.0%;border:none;border-bottom:solid #DDDDDD 1.0pt;background:#EEEEEE;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b><span style='color:black'>Price </span><o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" + tabla_service +
        "<tr style='mso-yfti-irow:3'>" +
        "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b>Total:$&nbsp;" + parseFloat(item.quotation_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" +
        discount +
        "<tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes'>" +
        "<td colspan=2 valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal align=right style='text-align:right'><b>Final Total:$&nbsp;" + parseFloat(item.final_amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "<o:p></o:p></b></p>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        detalle_installments +
        "<p class=MsoNormal><span lang=EN-US style='display:none;mso-hide:all;mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>" +
        "<table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width='100%' style='width:100.0%;mso-cellspacing:1.8pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 0in 0in 0in;line-height:inherit'>" +
        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>" +
        "<td valign=top style='border:none;border-top:solid #EEEEEE 1.5pt;padding:3.75pt 3.75pt 3.75pt 3.75pt'>" +
        "<p class=MsoNormal style='line-height:18.75pt'><br><br><br>" +
        "<em><span style='font-size:9.0pt;font-family:'Calibri',sans-serif'>This is computer generated quotation. Does not require a signature.</span></em></p>" +
        "</td></tr>" +
        "</table>" +
        "</body></canvas></html>";

    },

  },
  actions: {
    async GetLeads({
      commit
    }) {
      const todos = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.state.organizationID
            },
            SK: {
              eq: 'CUS#'
            },
            indexs: {
              eq: 'table'
            },
            active: {
              eq: "1"
            }
          }
        },
      });
      this.state.items = todos.data.listCustomers;
      commit('SetLeads', this.state.items);
    },

    async GetLeads_Seek({
      commit
    }) {
      const todos = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.state.organizationID
            },
            SK: {
              eq: 'CUS#'
            },
            seekingService: {
              eq: 'Y'
            },
            indexs: {
              eq: 'table_seeking'
            },
            active: {
              eq: "1"
            }
          }
        },
      });
      const items = todos.data.listCustomers;
      commit('SetLeads_Seek', items);
    }
  },
  plugins: [createPersistedState()]

})