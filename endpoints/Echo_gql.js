const ENDPOINTS = [
  {
    name: "Data Availability",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/dataavailability"
  },
  {
    name: "Get Echo Finding Modules",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getEchoFindingModules {
        echoFindingModules {
          id
          displayName
          description
          name
          active
          displayRank
          __typename
        }
      }
    `,
    variables: {}
  },
  {
    name: "Get Echo Attributes",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getEchoAttributes {
        echoAttributes {
          id
          careEntityId
          caseListModuleName
          maxStudyDate
          count
          echoLatestRefreshDate
          __typename
        }
      }
    `,
    variables: {}
  },
  {
    name: "Get Echo Finding Fields",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getEchoFindingFields($caselistModuleName: String) {
        echoFindingFields(caselistModuleName: $caselistModuleName) {
          id
          name
          phi
          type
          visibility
          displayName
          displayRank
          description
          category
          trained
          __typename
        }
      }
    `,
    variables: {
      caselistModuleName: "TAVR" // This can be changed based on the required module
    }
  },
  {
    name: "Get Echo Findings",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getEchoFindings($avStenosis: String, $excludeFromAnalysis: Int, $latestStudyOnRecord: Int, $caselistModuleName: String!, $careEntityId: String, $endDate: DateTime, $startDate: DateTime) {
        echoFindings(
          avStenosis: $avStenosis
          excludeFromAnalysis: $excludeFromAnalysis
          latestStudyOnRecord: $latestStudyOnRecord
          caselistModuleName: $caselistModuleName
          careEntityId: $careEntityId
          endDate: $endDate
          startDate: $startDate
        ) {
          biomeEncounterId
          system
          dataset
          caseId
          mrn
          mrnOriginal
          biomeCaseUid
          biomePatientUid
          empi
          patientName
          encounterId
          facility
          gender
          ageGroup
          orderDt
          orderId
          procedureDt
          procedureName
          readingProviderId
          readingProviderName
          referringProvider
          region
          resultSignedDt
          room
          sonographerId
          sonographerName
          studyCountByMrn
          visitType
          aorticRoot
          aorticRootText
          asd
          asdText
          avInsufficiency
          avInsufficiencyText
          avStenosis
          avStenosisText
          avStructure
          avStructureText
          avVegetation
          avVegetationText
          avRegurgitation
          avRegurgitationText
          contrast
          contrastText
          estimatedPap
          estimatedPapText
          laSize
          laSizeText
          lvDiastolicFunction
          lvDiastolicFunctionText
          lvFunction
          lvFunctionText
          lvefRange
          lvefRangeText
          lvSize
          lvSizeText
          lvWallMotion
          lvWallMotionText
          lvWallThickness
          lvWallThicknessText
          mvRegurgitation
          mvRegurgitationText
          mvStenosis
          mvStenosisText
          mvStructure
          mvStructureText
          mvVegetation
          mvVegetationText
          otherValveDisease
          caselistModuleName
          pericardialFluid
          pericardialFluidText
          pvStenosis
          pvStenosisText
          pvStructure
          pvStructureText
          pvVegetation
          pvVegetationText
          raSize
          raSizeText
          rvFunction
          rvFunctionText
          rvSize
          rvSizeText
          rvSystolicPressure
          rvSystolicPressureText
          strainImaging
          strainImagingText
          studyQuality
          studyQualityText
          thrombiMasses
          thrombiMassesText
          tvRegurgitation
          tvRegurgitationText
          tvStenosis
          tvStenosisText
          tvStructure
          tvStructureText
          tvVegetation
          tvVegetationText
          vsd
          vsdText
          symptoms
          symptomsText
          cardiomyopathy
          cardiomyopathyText
          aiDecel
          aiDecelText
          aipht
          aiphtText
          avArea
          avAreaText
          avMeanGradient
          avMeanGradientText
          avPeakGradient
          avPeakGradientText
          avPeakVelocity
          avPeakVelocityText
          ivSdThickness
          ivSdThicknessText
          lvef
          lvefText
          lvefMod
          lvefModText
          lveFcubed
          lveFcubedText
          lviDdMm
          lviDdMmText
          lVdDiastole
          lVdDiastoleText
          lVdSystole
          lVdSystoleText
          mvapht
          mvaphtText
          mvMeanPg
          mvMeanPgText
          mvRegurgVolume
          mvRegurgVolumeText
          pWdThickness
          pWdThicknessText
          rvDiameter
          rvDiameterText
          rvsptr
          rvsptrText
          tRmaxPg
          tRmaxPgText
          tRmeanPg
          tRmeanPgText
          tveaRatio
          tveaRatioText
          tvMaxPg
          tvMaxPgText
          tvMeanPg
          tvMeanPgText
          excludeFromAnalysis
          previousTavr
          previousSavr
          priorAvr
          latestStudyOnRecord
          biomeUpdateDt
          careEntityId
          careEntityName
          procedureQuarter
          echoResultText
          age
          race
          hf6m
          cardiacDamageStage
          laVol
          laVolText
          raVol
          raVolText
          ascAo
          ascAoText
          rvFac
          rvFacText
          followups {
            id
            biomeCaseUid
            biomePatientUid
            notes
            statusId
            version
            createdAt
            updateAt
            updateBy {
              fullName
              title
              firstName
              lastName
              __typename
            }
            latestStudyOnRecord
            __typename
          }
          __typename
        }
      }
    `,
    variables: {
      careEntityId: "vrqL6wLdWnDfNM1du9VYNL",
      caselistModuleName: "TAVR",
      endDate: "2025-07-19T23:59:00.000Z",
      startDate: "2025-05-01T00:00:00.000Z"
    }
  }
];

export default ENDPOINTS;