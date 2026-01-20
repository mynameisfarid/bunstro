// app/controllers/master_majors_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import MasterMajorService from '#services/master_major_service'

export default class MasterMajorController {
  private service = new MasterMajorService()

  async index({ view, request }: HttpContext) {
    const filters = {
      search: request.input('search', ''),
      column: request.input('column', 'code_name'),
      operator: request.input('operator', 'contains'),
      sortBy: request.input('sortBy', 'id'),
      sortOrder: request.input('sortOrder', 'desc'),
      page: request.input('page', 1),
      perPage: request.input('perPage', 10),
    }

    const majors = await this.service.list(filters)
    return view.render('dashboard::master_major/index', { majors, filters })
  }

  async show({ view, params, request: _request }: HttpContext) {
    const major = await this.service.find(params.id)
    return view.render('dashboard::master_major/show', { major })
  }

  async create({ view }: HttpContext) {
    return view.render('dashboard::master_major/form', { major: null, action: 'create' })
  }

  async store({ request, response, session }: HttpContext) {
    const data = request.only(['guid', 'gsource', 'codeName'])

    try {
      await this.service.create(data)
      session.flash('success', 'Data berhasil ditambahkan')

      // Return success response untuk HTMX
      response.header('HX-Trigger', 'dataChanged')
      return response.redirect().toRoute('dashboard.master_majors.index')
    } catch (error) {
      session.flash('error', 'Gagal menambahkan data')
      return response.redirect().back()
    }
  }

  async edit({ view, params }: HttpContext) {
    const major = await this.service.find(params.id)
    return view.render('dashboard::master_major/form', { major, action: 'edit' })
  }

  async update({ params, request, response, session }: HttpContext) {
    const data = request.only(['guid', 'gsource', 'codeName'])

    try {
      await this.service.update(params.id, data)
      session.flash('success', 'Data berhasil diupdate')

      response.header('HX-Trigger', 'dataChanged')
      return response.redirect().toRoute('dashboard.master_majors.index')
    } catch (error) {
      session.flash('error', 'Gagal mengupdate data')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      await this.service.delete(params.id)
      session.flash('success', 'Data berhasil dihapus')

      response.header('HX-Trigger', 'dataChanged')
      return response.json({ success: true })
    } catch (error) {
      return response.status(500).json({ success: false, message: 'Gagal menghapus data' })
    }
  }

  async export({ params, response }: HttpContext) {
    const format = params.format as 'csv' | 'json' | 'excel'

    try {
      const data = await this.service.export(format)

      const contentTypes = {
        csv: 'text/csv',
        json: 'application/json',
        excel: 'application/vnd.ms-excel',
      }

      const extensions = {
        csv: 'csv',
        json: 'json',
        excel: 'csv',
      }

      response.header('Content-Type', contentTypes[format])
      response.header(
        'Content-Disposition',
        `attachment; filename="master_majors.${extensions[format]}"`
      )

      return response.send(data)
    } catch (error) {
      return response.status(500).json({ error: 'Export failed' })
    }
  }
}
