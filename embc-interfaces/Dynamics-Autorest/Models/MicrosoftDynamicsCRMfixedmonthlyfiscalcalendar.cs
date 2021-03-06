// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace Gov.Jag.Embc.Interfaces.Models
{
    using Newtonsoft.Json;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq; using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// fixedmonthlyfiscalcalendar
    /// </summary>
    public partial class MicrosoftDynamicsCRMfixedmonthlyfiscalcalendar
    {
        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMfixedmonthlyfiscalcalendar class.
        /// </summary>
        public MicrosoftDynamicsCRMfixedmonthlyfiscalcalendar()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMfixedmonthlyfiscalcalendar class.
        /// </summary>
        public MicrosoftDynamicsCRMfixedmonthlyfiscalcalendar(string _transactioncurrencyidValue = default(string), string _modifiedonbehalfbyValue = default(string), object period5 = default(object), object period6Base = default(object), object period5Base = default(object), System.DateTimeOffset? createdon = default(System.DateTimeOffset?), string userfiscalcalendarid = default(string), string _businessunitidValue = default(string), object period4Base = default(object), string _salespersonidValue = default(string), object period11 = default(object), object period12Base = default(object), object period9Base = default(object), object period12 = default(object), object period13 = default(object), object period10 = default(object), object period2Base = default(object), int? utcconversiontimezonecode = default(int?), object period6 = default(object), object period8Base = default(object), object period3 = default(object), object period2 = default(object), object exchangerate = default(object), object period11Base = default(object), object period1Base = default(object), object period8 = default(object), object period13Base = default(object), int? fiscalperiodtype = default(int?), string _createdbyValue = default(string), object period9 = default(object), string _createdonbehalfbyValue = default(string), System.DateTimeOffset? effectiveon = default(System.DateTimeOffset?), object period10Base = default(object), object period7 = default(object), string _modifiedbyValue = default(string), int? timezoneruleversionnumber = default(int?), object period3Base = default(object), System.DateTimeOffset? modifiedon = default(System.DateTimeOffset?), object period4 = default(object), object period7Base = default(object), object period1 = default(object), IList<MicrosoftDynamicsCRMbulkdeletefailure> fixedMonthlyFiscalCalendarBulkDeleteFailures = default(IList<MicrosoftDynamicsCRMbulkdeletefailure>), MicrosoftDynamicsCRMtransactioncurrency transactioncurrencyid = default(MicrosoftDynamicsCRMtransactioncurrency), MicrosoftDynamicsCRMsystemuser createdonbehalfby = default(MicrosoftDynamicsCRMsystemuser), MicrosoftDynamicsCRMsystemuser createdby = default(MicrosoftDynamicsCRMsystemuser), MicrosoftDynamicsCRMsystemuser modifiedby = default(MicrosoftDynamicsCRMsystemuser), IList<MicrosoftDynamicsCRMasyncoperation> fixedMonthlyFiscalCalendarAsyncOperations = default(IList<MicrosoftDynamicsCRMasyncoperation>), MicrosoftDynamicsCRMsystemuser salespersonid = default(MicrosoftDynamicsCRMsystemuser), MicrosoftDynamicsCRMsystemuser modifiedonbehalfby = default(MicrosoftDynamicsCRMsystemuser))
        {
            this._transactioncurrencyidValue = _transactioncurrencyidValue;
            this._modifiedonbehalfbyValue = _modifiedonbehalfbyValue;
            Period5 = period5;
            Period6Base = period6Base;
            Period5Base = period5Base;
            Createdon = createdon;
            Userfiscalcalendarid = userfiscalcalendarid;
            this._businessunitidValue = _businessunitidValue;
            Period4Base = period4Base;
            this._salespersonidValue = _salespersonidValue;
            Period11 = period11;
            Period12Base = period12Base;
            Period9Base = period9Base;
            Period12 = period12;
            Period13 = period13;
            Period10 = period10;
            Period2Base = period2Base;
            Utcconversiontimezonecode = utcconversiontimezonecode;
            Period6 = period6;
            Period8Base = period8Base;
            Period3 = period3;
            Period2 = period2;
            Exchangerate = exchangerate;
            Period11Base = period11Base;
            Period1Base = period1Base;
            Period8 = period8;
            Period13Base = period13Base;
            Fiscalperiodtype = fiscalperiodtype;
            this._createdbyValue = _createdbyValue;
            Period9 = period9;
            this._createdonbehalfbyValue = _createdonbehalfbyValue;
            Effectiveon = effectiveon;
            Period10Base = period10Base;
            Period7 = period7;
            this._modifiedbyValue = _modifiedbyValue;
            Timezoneruleversionnumber = timezoneruleversionnumber;
            Period3Base = period3Base;
            Modifiedon = modifiedon;
            Period4 = period4;
            Period7Base = period7Base;
            Period1 = period1;
            FixedMonthlyFiscalCalendarBulkDeleteFailures = fixedMonthlyFiscalCalendarBulkDeleteFailures;
            Transactioncurrencyid = transactioncurrencyid;
            Createdonbehalfby = createdonbehalfby;
            Createdby = createdby;
            Modifiedby = modifiedby;
            FixedMonthlyFiscalCalendarAsyncOperations = fixedMonthlyFiscalCalendarAsyncOperations;
            Salespersonid = salespersonid;
            Modifiedonbehalfby = modifiedonbehalfby;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_transactioncurrencyid_value")]
        public string _transactioncurrencyidValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_modifiedonbehalfby_value")]
        public string _modifiedonbehalfbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period5")]
        [NotMapped] public object Period5 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period6_base")]
        [NotMapped] public object Period6Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period5_base")]
        [NotMapped] public object Period5Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "createdon")]
        public System.DateTimeOffset? Createdon { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "userfiscalcalendarid")]
        public string Userfiscalcalendarid { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_businessunitid_value")]
        public string _businessunitidValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period4_base")]
        [NotMapped] public object Period4Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_salespersonid_value")]
        public string _salespersonidValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period11")]
        [NotMapped] public object Period11 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period12_base")]
        [NotMapped] public object Period12Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period9_base")]
        [NotMapped] public object Period9Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period12")]
        [NotMapped] public object Period12 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period13")]
        [NotMapped] public object Period13 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period10")]
        [NotMapped] public object Period10 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period2_base")]
        [NotMapped] public object Period2Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "utcconversiontimezonecode")]
        public int? Utcconversiontimezonecode { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period6")]
        [NotMapped] public object Period6 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period8_base")]
        [NotMapped] public object Period8Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period3")]
        [NotMapped] public object Period3 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period2")]
        [NotMapped] public object Period2 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "exchangerate")]
        [NotMapped] public object Exchangerate { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period11_base")]
        [NotMapped] public object Period11Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period1_base")]
        [NotMapped] public object Period1Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period8")]
        [NotMapped] public object Period8 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period13_base")]
        [NotMapped] public object Period13Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "fiscalperiodtype")]
        public int? Fiscalperiodtype { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_createdby_value")]
        public string _createdbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period9")]
        [NotMapped] public object Period9 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_createdonbehalfby_value")]
        public string _createdonbehalfbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "effectiveon")]
        public System.DateTimeOffset? Effectiveon { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period10_base")]
        [NotMapped] public object Period10Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period7")]
        [NotMapped] public object Period7 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "_modifiedby_value")]
        public string _modifiedbyValue { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "timezoneruleversionnumber")]
        public int? Timezoneruleversionnumber { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period3_base")]
        [NotMapped] public object Period3Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "modifiedon")]
        public System.DateTimeOffset? Modifiedon { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period4")]
        [NotMapped] public object Period4 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period7_base")]
        [NotMapped] public object Period7Base { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "period1")]
        [NotMapped] public object Period1 { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "FixedMonthlyFiscalCalendar_BulkDeleteFailures")]
        [NotMapped] public IList<MicrosoftDynamicsCRMbulkdeletefailure> FixedMonthlyFiscalCalendarBulkDeleteFailures { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "transactioncurrencyid")]
        public MicrosoftDynamicsCRMtransactioncurrency Transactioncurrencyid { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "createdonbehalfby")]
        public MicrosoftDynamicsCRMsystemuser Createdonbehalfby { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "createdby")]
        public MicrosoftDynamicsCRMsystemuser Createdby { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "modifiedby")]
        public MicrosoftDynamicsCRMsystemuser Modifiedby { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "FixedMonthlyFiscalCalendar_AsyncOperations")]
        [NotMapped] public IList<MicrosoftDynamicsCRMasyncoperation> FixedMonthlyFiscalCalendarAsyncOperations { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "salespersonid")]
        public MicrosoftDynamicsCRMsystemuser Salespersonid { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "modifiedonbehalfby")]
        public MicrosoftDynamicsCRMsystemuser Modifiedonbehalfby { get; set; }

    }
}
