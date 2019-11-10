import bcrypt from 'bcrypt'

class Encryption {
  async hash (data: object | string | number): Promise<string> {
    return bcrypt.hash(data, 10)
  }

  async compare (data: object | string | number, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted)
  }
}

export default new Encryption()
