// types.d.ts
export interface FamilyData {
  cd_ibge: string;
  cod_familiar_fam: string;
  dat_cadastramento_fam: string;
  dat_atual_fam: string;
  cod_est_cadastral_fam: string;
  cod_forma_coleta_fam: string;
  dta_entrevista_fam: string;
  nom_localidade_fam: string;
  nom_tip_logradouro_fam: string;
  nom_titulo_logradouro_fam: string;
  nom_logradouro_fam: string;
  num_logradouro_fam: string;
  des_complemento_fam?: string; // Campos opcionais
  des_complemento_adic_fam?: string;
  num_cep_logradouro_fam: string;
  cod_unidade_territorial_fam: string;
  nom_unidade_territorial_fam: string;
  txt_referencia_local_fam?: string;
  nom_entrevistador_fam: string;
  num_cpf_entrevistador_fam: string;
  vlr_renda_media_fam: number;
  fx_rfpc?: string;
  vlr_renda_total_fam: number;
  marc_pbf: boolean;
  qtde_meses_desat_cat: number;
  cod_local_domic_fam: string;
  cod_especie_domic_fam: string;
  qtd_comodos_domic_fam: number;
  qtd_comodos_dormitorio_fam: number;
  cod_material_piso_fam: string;
  cod_material_domic_fam: string;
  cod_agua_canalizada_fam: string;
  cod_abaste_agua_domic_fam: string;
  cod_banheiro_domic_fam: string;
  cod_escoa_sanitario_domic_fam: string;
  cod_destino_lixo_domic_fam: string;
  cod_iluminacao_domic_fam: string;
  cod_calcamento_domic_fam: string;
  cod_familia_indigena_fam: string;
  cod_povo_indigena_fam: string;
  nom_povo_indigena_fam?: string;
  cod_indigena_reside_fam: string;
  cod_reserva_indigena_fam: string;
  nom_reserva_indigena_fam?: string;
  ind_familia_quilombola_fam: string;
  cod_comunidade_quilombola_fam: string;
  nom_comunidade_quilombola_fam?: string;
  qtd_pessoas_domic_fam: number;
  qtd_familias_domic_fam: number;
  qtd_pessoa_inter_0_17_anos_fam: number;
  qtd_pessoa_inter_18_64_anos_fam: number;
  qtd_pessoa_inter_65_anos_fam: number;
  val_desp_energia_fam: number;
  val_desp_agua_esgoto_fam: number;
  val_desp_gas_fam: number;
  val_desp_alimentacao_fam: number;
  val_desp_transpor_fam: number;
  val_desp_aluguel_fam: number;
  val_desp_medicamentos_fam: number;
  nom_estab_assist_saude_fam: string;
  cod_eas_fam: string;
  nom_centro_assist_fam: string;
  cod_centro_assist_fam: string;
  num_ddd_contato_1_fam: string;
  num_tel_contato_1_fam: string;
  ic_tipo_contato_1_fam: string;
  ic_envo_sms_contato_1_fam: string;
  num_tel_contato_2_fam?: string;
  num_ddd_contato_2_fam?: string;
  ic_tipo_contato_2_fam?: string;
  ic_envo_sms_contato_2_fam?: string;
  cod_cta_energ_unid_consum_fam: string;
  ind_parc_mds_fam: string;
  ref_cad: string;
  ref_pbf: string;
  cod_familiar_fam: string;
  cod_est_cadastral_memb: string;
  ind_trabalho_infantil_pessoa: string;
  nom_pessoa: string;
  num_nis_pessoa_atual: string;
  nom_apelido_pessoa?: string;
  cod_sexo_pessoa: string;
  dta_nasc_pessoa: string;
  cod_parentesco_rf_pessoa: string;
  cod_raca_cor_pessoa: string;
  nom_completo_mae_pessoa: string;
  nom_completo_pai_pessoa: string;
  cod_local_nascimento_pessoa: string;
  sig_uf_munic_nasc_pessoa: string;
  nom_ibge_munic_nasc_pessoa: string;
  cod_ibge_munic_nasc_pessoa: string;
  nom_pais_origem_pessoa: string;
  cod_pais_origem_pessoa: string;
  cod_certidao_registrada_pessoa: string;
  fx_idade: string;
  marc_pbf?: string;
  cod_certidao_civil_pessoa: string;
  cod_livro_termo_certid_pessoa: string;
  cod_folha_termo_certid_pessoa: string;
  cod_termo_matricula_certid_pessoa: string;
  nom_munic_certid_pessoa: string;
  cod_ibge_munic_certid_pessoa: string;
  cod_cartorio_certid_pessoa: string;
  num_cpf_pessoa: string;
  num_identidade_pessoa: string;
  cod_complemento_pessoa?: string;
  dta_emissao_ident_pessoa: string;
  sig_uf_ident_pessoa: string;
  sig_orgao_emissor_pessoa: string;
  num_cart_trab_prev_soc_pessoa: string;
  num_serie_trab_prev_soc_pessoa: string;
  dta_emissao_cart_trab_pessoa: string;
  sig_uf_cart_trab_pessoa: string;
  num_titulo_eleitor_pessoa: string;
  num_zona_tit_eleitor_pessoa: string;
  num_secao_tit_eleitor_pessoa: string;
  cod_deficiencia_memb: string;
  ind_def_cegueira_memb: string;
  ind_def_baixa_visao_memb: string;
  ind_def_surdez_profunda_memb: string;
  ind_def_surdez_leve_memb: string;
  ind_def_fisica_memb: string;
  ind_def_mental_memb: string;
  ind_def_sindrome_down_memb: string;
  ind_def_transtorno_mental_memb: string;
  ind_ajuda_nao_memb: string;
  ind_ajuda_familia_memb: string;
  ind_ajuda_especializado_memb: string;
  ind_ajuda_vizinho_memb: string;
  ind_ajuda_instituicao_memb: string;
  ind_ajuda_outra_memb: string;
  cod_sabe_ler_escrever_memb: string;
  ind_frequenta_escola_memb: string;
  nom_escola_memb?: string;
  cod_escola_local_memb: string;
  sig_uf_escola_memb: string;
  nom_munic_escola_memb: string;
  cod_ibge_munic_escola_memb: string;
  cod_censo_inep_memb: string;
  cod_curso_frequenta_memb: string;
  cod_ano_serie_frequenta_memb: string;
  cod_curso_frequentou_pessoa_memb: string;
  cod_ano_serie_frequentou_memb: string;
  cod_concluiu_frequentou_memb: string;
  grau_instrucao: string;
  cod_trabalhou_memb: string;
  cod_afastado_trab_memb: string;
  cod_agricultura_trab_memb: string;
  cod_principal_trab_memb: string;
  cod_trabalho_12_meses_memb: string;
  qtd_meses_12_meses_memb: number;
  fx_renda_individual_805: string;
  fx_renda_individual_808: string;
  fx_renda_individual_809_1: string;
  fx_renda_individual_809_2: string;
  fx_renda_individual_809_3: string;
  fx_renda_individual_809_4: string;
  fx_renda_individual_809_5: string;
  marc_sit_rua: string;
  ind_dormir_rua_memb: string;
  qtd_dormir_freq_rua_memb: number;
  ind_dormir_albergue_memb: string;
  qtd_dormir_freq_albergue_memb: number;
  ind_dormir_dom_part_memb: string;
  qtd_dormir_freq_dom_part_memb: number;
  ind_outro_memb: string;
  qtd_freq_outro_memb: number;
  cod_tempo_rua_memb: string;
  ind_motivo_perda_memb: string;
  ind_motivo_ameaca_memb: string;
  ind_motivo_probs_fam_memb: string;
  ind_motivo_probs_trab_memb: string;
  ind_motivo_situacao_memb: string;
  ind_motivo_motivo_outra_memb: string;
  cod_ano_2019: string;
  ind_marcacao_ficha: string;
  ind_atendimento_atuante_memb: string;
  cod_apresentou_ficha: string;
  ind_segurado_bolsa_familia: string;
  ind_efetiva_agradecimento: string;
  ind_presta_conta_familiar: string;
  cod_finalidade_pesquisa: string;
  cod_finalidade_conclusao: string;
  dat_hora_cadastro: string;
  dat_hora_atualizacao: string;
}
