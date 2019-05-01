﻿// <auto-generated />
using System;
using Gov.Jag.Embc.Public.DataInterfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Gov.Jag.Embc.Public.Migrations
{
    [DbContext(typeof(EmbcDbContext))]
    partial class EmbcDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("Relational:Sequence:.ESSFileNumbers", "'ESSFileNumbers', '', '100000', '1', '', '', 'Int64', 'False'")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Address", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AddressLine1");

                    b.Property<string>("AddressLine2");

                    b.Property<string>("AddressLine3");

                    b.Property<string>("AddressSubtype")
                        .IsRequired();

                    b.Property<string>("CountryCode");

                    b.Property<string>("PostalCode");

                    b.Property<string>("Province");

                    b.HasKey("Id");

                    b.HasIndex("CountryCode");

                    b.ToTable("Addresses");

                    b.HasDiscriminator<string>("AddressSubtype").HasValue("Address");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Community", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<string>("RegionName");

                    b.HasKey("Id");

                    b.HasIndex("RegionName");

                    b.ToTable("Communities");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Country", b =>
                {
                    b.Property<string>("CountryCode")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.HasKey("CountryCode");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.FamilyRelationshipType", b =>
                {
                    b.Property<string>("Code");

                    b.Property<bool>("Active");

                    b.Property<string>("Description")
                        .HasMaxLength(255);

                    b.HasKey("Code");

                    b.ToTable("FamilyRelationshipTypes");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.IncidentTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<Guid?>("CommunityId");

                    b.Property<string>("Details");

                    b.Property<string>("RegionName");

                    b.Property<DateTimeOffset?>("StartDate");

                    b.Property<string>("TaskNumber");

                    b.HasKey("Id");

                    b.HasIndex("CommunityId");

                    b.HasIndex("RegionName");

                    b.ToTable("IncidentTasks");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Organization", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("BCeIDBusinessGuid")
                        .HasColumnName("BceidAccountNumber")
                        .HasMaxLength(100);

                    b.Property<Guid?>("CommunityId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<string>("RegionName");

                    b.HasKey("Id");

                    b.HasIndex("CommunityId");

                    b.HasIndex("RegionName");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Person", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset?>("Dob");

                    b.Property<string>("FirstName")
                        .HasMaxLength(255);

                    b.Property<string>("Gender")
                        .HasMaxLength(255);

                    b.Property<string>("Initials")
                        .HasMaxLength(255);

                    b.Property<string>("LastName")
                        .HasMaxLength(255);

                    b.Property<string>("Nickname")
                        .HasMaxLength(255);

                    b.Property<string>("PersonType")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("People");

                    b.HasDiscriminator<string>("PersonType").HasValue("Person");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Region", b =>
                {
                    b.Property<string>("Name")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<bool>("Active");

                    b.HasKey("Name");

                    b.ToTable("Regions");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Registration", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<Guid?>("CompletedById");

                    b.Property<bool?>("DeclarationAndConsent");

                    b.Property<bool?>("DietaryNeeds");

                    b.Property<string>("DietaryNeedsDetails");

                    b.Property<string>("DisasterAffectDetails");

                    b.Property<long>("EssFileNumber")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasDefaultValueSql("NEXT VALUE FOR ESSFileNumbers");

                    b.Property<string>("ExternalReferralsDetails");

                    b.Property<string>("Facility");

                    b.Property<string>("FamilyRecoveryPlan");

                    b.Property<string>("FollowUpDetails");

                    b.Property<bool?>("HasChildCareReferral");

                    b.Property<bool?>("HasFirstAidReferral");

                    b.Property<bool?>("HasHealthServicesReferral");

                    b.Property<bool?>("HasInquiryReferral");

                    b.Property<bool?>("HasPersonalServicesReferral");

                    b.Property<bool?>("HasPetCareReferral");

                    b.Property<bool?>("HasPets");

                    b.Property<bool?>("HasThreeDayMedicationSupply");

                    b.Property<Guid?>("HeadOfHouseholdId");

                    b.Property<Guid?>("HostCommunityId");

                    b.Property<Guid?>("IncidentTaskId");

                    b.Property<string>("InsuranceCode");

                    b.Property<bool?>("MedicationNeeds");

                    b.Property<string>("RegisteringFamilyMembers");

                    b.Property<DateTimeOffset?>("RegistrationCompletionDate");

                    b.Property<bool?>("RequiresAccommodation");

                    b.Property<bool?>("RequiresClothing");

                    b.Property<bool?>("RequiresFood");

                    b.Property<bool?>("RequiresIncidentals");

                    b.Property<bool?>("RequiresSupport");

                    b.Property<bool?>("RequiresTransportation");

                    b.Property<bool?>("RestrictedAccess");

                    b.Property<DateTimeOffset?>("SelfRegisteredDate");

                    b.HasKey("Id");

                    b.HasIndex("HeadOfHouseholdId");

                    b.HasIndex("HostCommunityId");

                    b.HasIndex("IncidentTaskId");

                    b.ToTable("Registrations");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Volunteer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<string>("BceidAccountNumber");

                    b.Property<bool?>("CanAccessRestrictedFiles");

                    b.Property<string>("Email")
                        .HasMaxLength(255);

                    b.Property<Guid?>("Externaluseridentifier");

                    b.Property<string>("FirstName")
                        .HasMaxLength(255);

                    b.Property<bool?>("IsAdministrator");

                    b.Property<bool?>("IsNewUser");

                    b.Property<bool?>("IsPrimaryContact");

                    b.Property<string>("LastName")
                        .HasMaxLength(255);

                    b.Property<Guid?>("OrganizationId");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Volunteers");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.BcAddress", b =>
                {
                    b.HasBaseType("Gov.Jag.Embc.Public.Models.Db.Address");

                    b.Property<Guid>("CommunityId");

                    b.HasIndex("CommunityId");

                    b.ToTable("BcAddress");

                    b.HasDiscriminator().HasValue("BCAD");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.OtherAddress", b =>
                {
                    b.HasBaseType("Gov.Jag.Embc.Public.Models.Db.Address");

                    b.Property<string>("City");

                    b.ToTable("OtherAddress");

                    b.HasDiscriminator().HasValue("OTAD");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.FamilyMember", b =>
                {
                    b.HasBaseType("Gov.Jag.Embc.Public.Models.Db.Person");

                    b.Property<string>("BcServicesNumber");

                    b.Property<Guid?>("HeadOfHouseholdId");

                    b.Property<string>("RelationshipToEvacueeCode");

                    b.Property<bool>("SameLastNameAsEvacuee");

                    b.HasIndex("HeadOfHouseholdId");

                    b.HasIndex("RelationshipToEvacueeCode");

                    b.ToTable("FamilyMember");

                    b.HasDiscriminator().HasValue("FMBR");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.HeadOfHousehold", b =>
                {
                    b.HasBaseType("Gov.Jag.Embc.Public.Models.Db.Person");

                    b.Property<string>("BcServicesNumber")
                        .HasColumnName("HeadOfHousehold_BcServicesNumber");

                    b.Property<string>("Email");

                    b.Property<Guid?>("MailingAddressId");

                    b.Property<string>("PhoneNumber");

                    b.Property<string>("PhoneNumberAlt");

                    b.Property<Guid?>("PrimaryResidenceId");

                    b.HasIndex("MailingAddressId");

                    b.HasIndex("PrimaryResidenceId");

                    b.ToTable("HeadOfHousehold");

                    b.HasDiscriminator().HasValue("HOH");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Address", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryCode");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Community", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Region", "Region")
                        .WithMany()
                        .HasForeignKey("RegionName");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.IncidentTask", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Community", "Community")
                        .WithMany()
                        .HasForeignKey("CommunityId");

                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Region", "Region")
                        .WithMany()
                        .HasForeignKey("RegionName");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Organization", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Community", "Community")
                        .WithMany("Organizations")
                        .HasForeignKey("CommunityId");

                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Region", "Region")
                        .WithMany("Organizations")
                        .HasForeignKey("RegionName");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Registration", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.HeadOfHousehold", "HeadOfHousehold")
                        .WithMany()
                        .HasForeignKey("HeadOfHouseholdId");

                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Community", "HostCommunity")
                        .WithMany()
                        .HasForeignKey("HostCommunityId");

                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.IncidentTask", "IncidentTask")
                        .WithMany("Registrations")
                        .HasForeignKey("IncidentTaskId");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.Volunteer", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.BcAddress", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Community", "Community")
                        .WithMany()
                        .HasForeignKey("CommunityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.FamilyMember", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.HeadOfHousehold")
                        .WithMany("FamilyMembers")
                        .HasForeignKey("HeadOfHouseholdId");

                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.FamilyRelationshipType", "RelationshipToEvacuee")
                        .WithMany()
                        .HasForeignKey("RelationshipToEvacueeCode");
                });

            modelBuilder.Entity("Gov.Jag.Embc.Public.Models.Db.HeadOfHousehold", b =>
                {
                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Address", "MailingAddress")
                        .WithMany()
                        .HasForeignKey("MailingAddressId");

                    b.HasOne("Gov.Jag.Embc.Public.Models.Db.Address", "PrimaryResidence")
                        .WithMany()
                        .HasForeignKey("PrimaryResidenceId");
                });
#pragma warning restore 612, 618
        }
    }
}
